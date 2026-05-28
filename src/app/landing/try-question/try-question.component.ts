import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { QUESTIONS, type QuestionOption } from './questions.data';

@Component({
  selector: 'app-try-question',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './try-question.component.html',
  styleUrl: './try-question.component.scss',
})
export class TryQuestionComponent {
  readonly questions = QUESTIONS;

  readonly qIdx = signal(0);
  readonly picked = signal<string | null>(null);
  readonly submitted = signal(false);

  readonly q = computed(() => QUESTIONS[this.qIdx()]);
  readonly correct = computed(() => this.submitted() && this.picked() === this.q().answer);
  readonly diffKey = computed((): 'easy' | 'medium' | 'hard' => {
    const map: Record<string, 'easy' | 'medium' | 'hard'> = {
      Łatwe: 'easy',
      Średnie: 'medium',
      Trudne: 'hard',
    };
    return map[this.q().difficulty] ?? 'medium';
  });

  readonly switcherLabels = computed(() =>
    QUESTIONS.map(q => q.track.split('·')[0].trim())
  );

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

  clearPick(): void {
    if (!this.submitted()) {
      this.picked.set(null);
    }
  }

  next(): void {
    this.reset((this.qIdx() + 1) % QUESTIONS.length);
  }

  optionState(opt: QuestionOption): 'correct' | 'wrong' | 'picked' | 'default' {
    if (!this.submitted()) {
      return this.picked() === opt.id ? 'picked' : 'default';
    }
    if (opt.id === this.q().answer) return 'correct';
    if (this.picked() === opt.id) return 'wrong';
    return 'default';
  }
}
