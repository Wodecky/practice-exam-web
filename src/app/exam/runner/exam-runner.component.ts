import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { interval } from 'rxjs';

import { EXAM_META, ExamResult, ExamSettings, formatTime } from '../exam.data';
import { ExamNavigatorComponent } from '../navigator/exam-navigator.component';
import type { Question } from '../exam.data';

@Component({
  selector: 'app-exam-runner',
  imports: [MatIconModule, ExamNavigatorComponent],
  templateUrl: './exam-runner.component.html',
  styleUrl: './exam-runner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'onKeydown($event)',
  },
})
export class ExamRunnerComponent {
  private readonly destroyRef = inject(DestroyRef);

  session = input.required<Question[]>();
  settings = input.required<ExamSettings>();
  finish = output<ExamResult>();
  exit = output<void>();

  readonly idx = signal(0);
  readonly answers = signal<Record<number, string>>({});
  readonly flagged = signal<Record<number, boolean>>({});
  readonly submittedMap = signal<Record<number, boolean>>({});
  readonly secondsLeft = signal(EXAM_META.minutes * 60);
  readonly navOpen = signal(false);
  readonly confirmExit = signal(false);
  readonly confirmFinish = signal(false);

  readonly q = computed(() => this.session()[this.idx()]);
  readonly total = computed(() => this.session().length);
  readonly picked = computed(() => this.answers()[this.q().id]);
  readonly isFlagged = computed(() => !!this.flagged()[this.q().id]);
  readonly isSubmitted = computed(
    () => this.settings().mode === 'training' && !!this.submittedMap()[this.q().id],
  );
  readonly answeredCount = computed(() => Object.keys(this.answers()).length);
  readonly flaggedCount = computed(() => Object.keys(this.flagged()).length);
  readonly progress = computed(() => ((this.idx() + 1) / this.total()) * 100);
  readonly timerWarn = computed(() => this.secondsLeft() < 60);
  readonly correctHere = computed(() => this.isSubmitted() && this.picked() === this.q().answer);
  readonly formattedTime = computed(() => formatTime(this.secondsLeft()));
  readonly flagIconFill = computed(() => (this.isFlagged() ? "'FILL' 1" : "'FILL' 0"));

  constructor() {
    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const next = this.secondsLeft() - 1;
        if (next <= 0) {
          this.secondsLeft.set(0);
          this.finishExam(true);
          return;
        }
        this.secondsLeft.set(next);
      });
  }

  onKeydown(e: KeyboardEvent): void {
    if (this.confirmExit() || this.confirmFinish()) return;
    if ((e.target as HTMLElement).tagName === 'INPUT') return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.prev();
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      this.toggleFlag();
    } else if (['1', '2', '3', '4'].includes(e.key)) {
      if (!this.isSubmitted()) {
        const opt = this.q().options[Number(e.key) - 1];
        if (opt) this.pickAnswer(opt.id);
      }
    }
  }

  pickAnswer(optId: string): void {
    this.answers.update((a) => ({ ...a, [this.q().id]: optId }));
  }

  toggleFlag(): void {
    this.flagged.update((f) => {
      const next = { ...f };
      if (next[this.q().id]) {
        delete next[this.q().id];
      } else {
        next[this.q().id] = true;
      }
      return next;
    });
  }

  goto(newIdx: number): void {
    this.idx.set(Math.max(0, Math.min(this.total() - 1, newIdx)));
    this.navOpen.set(false);
  }

  prev(): void {
    this.goto(this.idx() - 1);
  }

  next(): void {
    if (this.idx() < this.total() - 1) {
      this.goto(this.idx() + 1);
    } else {
      this.confirmFinish.set(true);
    }
  }

  submitOne(): void {
    this.submittedMap.update((m) => ({ ...m, [this.q().id]: true }));
  }

  finishExam(timeUp: boolean): void {
    const durationSec = EXAM_META.minutes * 60 - this.secondsLeft();
    this.finish.emit({
      answers: this.answers(),
      flagged: this.flagged(),
      durationSec,
      timeUp,
    });
  }
}
