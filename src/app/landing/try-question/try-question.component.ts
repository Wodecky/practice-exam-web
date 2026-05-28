import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  signal,
  viewChildren,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DIFF_KEY, QUESTIONS, QuestionOption } from './questions.data';

type OptionId = QuestionOption['id'];

@Component({
  selector: 'app-try-question',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './try-question.component.html',
  styleUrl: './try-question.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TryQuestionComponent {
  readonly questions = QUESTIONS;

  readonly qIdx = signal(0);
  readonly picked = signal<OptionId | null>(null);
  readonly submitted = signal(false);

  readonly q = computed(() => this.questions[this.qIdx()]);
  readonly correct = computed(() => this.submitted() && this.picked() === this.q().answer);
  readonly diffKey = computed(() => DIFF_KEY[this.q().difficulty] ?? 'medium');
  readonly correctLetter = computed(() => this.q().answer.toUpperCase());
  readonly switcherLabels = computed(() =>
    this.questions.map(question => question.track.split('·')[0].trim()),
  );

  readonly optionButtons = viewChildren<ElementRef<HTMLButtonElement>>('optionBtn');

  reset(idx: number): void {
    this.qIdx.set(idx);
    this.picked.set(null);
    this.submitted.set(false);
  }

  pick(id: OptionId): void {
    if (!this.submitted()) {
      this.picked.set(id);
    }
  }

  submit(): void {
    if (this.picked() && !this.submitted()) {
      this.submitted.set(true);
    }
  }

  cancelPick(): void {
    if (!this.submitted()) {
      this.picked.set(null);
    }
  }

  retry(): void {
    this.picked.set(null);
    this.submitted.set(false);
  }

  next(): void {
    this.reset((this.qIdx() + 1) % this.questions.length);
  }

  onOptionKeydown(event: KeyboardEvent, idx: number): void {
    if (this.submitted()) return;

    const options = this.q().options;
    let nextIdx = idx;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        nextIdx = (idx + 1) % options.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        nextIdx = (idx - 1 + options.length) % options.length;
        break;
      case 'Home':
        nextIdx = 0;
        break;
      case 'End':
        nextIdx = options.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    this.optionButtons()[nextIdx]?.nativeElement.focus();
    this.pick(options[nextIdx].id);
  }

  optionTabIndex(id: OptionId, idx: number): number {
    const picked = this.picked();
    if (picked === id) return 0;
    if (picked === null && idx === 0) return 0;
    return -1;
  }
}
