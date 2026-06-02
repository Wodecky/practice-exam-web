import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  model,
  viewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { CATEGORIES, Exam } from '../exam-list.data';

@Component({
  selector: 'app-exam-header',
  imports: [MatIconModule, RouterLink],
  templateUrl: './exam-header.component.html',
  styleUrl: './exam-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'onKeydown($event)',
  },
})
export class ExamHeaderComponent {
  readonly query = model.required<string>();
  readonly exams = input.required<readonly Exam[]>();

  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly categoryCount = CATEGORIES.length - 1;

  readonly examCount = computed(() => this.exams().length);

  readonly questionsLabel = computed(() => {
    const total = this.exams().reduce((acc, e) => acc + e.q, 0);
    return (total / 1000).toFixed(1).replace('.', ',') + ' tys.';
  });

  readonly avgRating = computed(() => {
    const exams = this.exams();
    if (exams.length === 0) return '—';
    const avg = exams.reduce((acc, e) => acc + e.rating, 0) / exams.length;
    return avg.toFixed(1).replace('.', ',') + '★';
  });

  clear(): void {
    this.query.set('');
    this.searchInput()?.nativeElement.focus();
  }

  onKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.searchInput()?.nativeElement.focus();
    }
  }
}
