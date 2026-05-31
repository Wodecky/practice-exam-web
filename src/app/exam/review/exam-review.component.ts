import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import type { Question } from '../exam.data';

@Component({
  selector: 'app-exam-review',
  imports: [MatIconModule],
  templateUrl: './exam-review.component.html',
  styleUrl: './exam-review.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamReviewComponent {
  session = input.required<Question[]>();
  answers = input.required<Record<number, string>>();
  flagged = input.required<Record<number, boolean>>();
  startIdx = input<number>(0);

  back = output<void>();

  readonly idx = signal(0);

  readonly q = computed(() => this.session()[this.idx()]);
  readonly answer = computed(() => this.answers()[this.q().id]);
  readonly isCorrect = computed(() => this.answer() === this.q().answer);
  readonly isFlagged = computed(() => !!this.flagged()[this.q().id]);
  readonly progress = computed(() => ((this.idx() + 1) / this.session().length) * 100);

  readonly iconFill1 = "'FILL' 1";

  answerState(): 'correct' | 'wrong' | 'blank' {
    const a = this.answer();
    if (!a) return 'blank';
    return a === this.q().answer ? 'correct' : 'wrong';
  }

  ngOnInit(): void {
    this.idx.set(this.startIdx());
  }

  prev(): void {
    this.idx.update((i) => Math.max(0, i - 1));
  }

  next(): void {
    this.idx.update((i) => Math.min(this.session().length - 1, i + 1));
  }
}
