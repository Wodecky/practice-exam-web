import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { EXAM_META, ExamResult, ExamSettings, formatTime } from '../exam.data';
import { ExamReviewComponent } from '../review/exam-review.component';
import type { Question } from '../exam.data';

interface Grade {
  label: string;
  tone: 'great' | 'good' | 'ok' | 'bad';
  icon: string;
  text: string;
}

@Component({
  selector: 'app-exam-summary',
  imports: [MatIconModule, ExamReviewComponent],
  templateUrl: './exam-summary.component.html',
  styleUrl: './exam-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamSummaryComponent {
  session = input.required<Question[]>();
  result = input.required<ExamResult>();
  settings = input.required<ExamSettings>();

  restart = output<void>();
  changeSettings = output<void>();

  readonly examMeta = EXAM_META;

  /** Index of question being reviewed; null = summary view */
  readonly reviewIdx = signal<number | null>(null);

  readonly total = computed(() => this.session().length);

  readonly correct = computed(
    () => this.session().filter((q) => this.result().answers[q.id] === q.answer).length,
  );

  readonly wrong = computed(
    () =>
      this.session().filter((q) => {
        const a = this.result().answers[q.id];
        return a && a !== q.answer;
      }).length,
  );

  readonly blank = computed(() => this.total() - this.correct() - this.wrong());

  readonly pct = computed(() => Math.round((this.correct() / this.total()) * 100));

  readonly grade = computed<Grade>(() => {
    const p = this.pct();
    if (p >= 90)
      return {
        label: 'Świetnie!',
        tone: 'great',
        icon: 'workspace_premium',
        text: 'Jesteś gotowy na egzamin.',
      };
    if (p >= 70)
      return {
        label: 'Dobrze',
        tone: 'good',
        icon: 'thumb_up',
        text: 'Solidny wynik — popraw pomyłki i wracaj.',
      };
    if (p >= 50)
      return {
        label: 'Zaliczone',
        tone: 'ok',
        icon: 'trending_up',
        text: 'Próg zdawalności osiągnięty. Czas na trening.',
      };
    return {
      label: 'Spróbuj ponownie',
      tone: 'bad',
      icon: 'replay',
      text: 'Przerób pytania, na których się pomyliłeś.',
    };
  });

  readonly formattedDuration = computed(() => formatTime(this.result().durationSec));

  // SVG ring
  readonly ringR = 70;
  readonly ringC = computed(() => 2 * Math.PI * this.ringR);
  readonly ringDash = computed(() => (this.pct() / 100) * this.ringC());

  answerState(q: Question): 'correct' | 'wrong' | 'blank' {
    const a = this.result().answers[q.id];
    if (!a) return 'blank';
    return a === q.answer ? 'correct' : 'wrong';
  }

  isFlagged(q: Question): boolean {
    return !!this.result().flagged[q.id];
  }

  readonly gradeIconFill = "'FILL' 1";

  openReview(idx: number): void {
    this.reviewIdx.set(idx);
  }
}
