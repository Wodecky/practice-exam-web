import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DIFF_KEY, QUESTIONS, Question } from './questions.data';

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
  readonly picked = signal<string | null>(null);
  readonly submitted = signal(false);

  readonly q = computed(() => this.questions[this.qIdx()]);
  readonly correct = computed(() => this.submitted() && this.picked() === this.q().answer);
  readonly diffKey = computed(() => DIFF_KEY[this.q().difficulty] ?? 'medium');

  reset(idx: number): void {
    this.qIdx.set(idx);
    this.picked.set(null);
    this.submitted.set(false);
  }

  pick(id: string): void {
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

  getOptionClass(optId: string): Record<string, boolean> {
    return {
      'qc-option-picked':  !this.submitted() && this.picked() === optId,
      'qc-option-correct':  this.submitted() && optId === this.q().answer,
      'qc-option-wrong':    this.submitted() && this.picked() === optId && optId !== this.q().answer,
    };
  }

  getWrongAnswerLetter(): string {
    return this.q().answer.toUpperCase();
  }
}
