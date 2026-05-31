import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import type { Question } from '../exam.data';

@Component({
  selector: 'app-exam-navigator',
  imports: [MatIconModule],
  templateUrl: './exam-navigator.component.html',
  styleUrl: './exam-navigator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamNavigatorComponent {
  session = input.required<Question[]>();
  idx = input.required<number>();
  answers = input.required<Record<number, string>>();
  flagged = input.required<Record<number, boolean>>();
  compact = input(false);
  showClose = input(false);

  goto = output<number>();
  finish = output<void>();
  close = output<void>();

  readonly answeredCount = computed(() => Object.keys(this.answers()).length);
  readonly flaggedCount = computed(() => Object.keys(this.flagged()).length);

  cellState(i: number): 'current' | 'answered' | 'empty' {
    const q = this.session()[i];
    if (i === this.idx()) return 'current';
    if (this.answers()[q.id]) return 'answered';
    return 'empty';
  }

  isCellFlagged(i: number): boolean {
    return !!this.flagged()[this.session()[i].id];
  }
}
