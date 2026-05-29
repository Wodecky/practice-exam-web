import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { Difficulty, Exam } from '../exam-list.data';

const DIFF_CLASS: Record<Difficulty, string> = {
  Łatwe: 'easy',
  Średnie: 'medium',
  Trudne: 'hard',
};

@Component({
  selector: 'app-exam-card',
  imports: [MatIconModule],
  templateUrl: './exam-card.component.html',
  styleUrl: './exam-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'el-card',
    '[class.el-card-list]': 'list()',
  },
})
export class ExamCardComponent {
  readonly exam = input.required<Exam>();
  /** Render in the horizontal list layout instead of the default card grid. */
  readonly list = input(false);

  readonly diffClass = computed(() => DIFF_CLASS[this.exam().diff]);
  readonly questions = computed(() => this.exam().q.toLocaleString('pl-PL'));
  readonly rating = computed(() => this.exam().rating.toString().replace('.', ','));
  readonly students = computed(() => (this.exam().students / 1000).toFixed(1).replace('.', ','));
}
