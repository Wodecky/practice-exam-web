import { ChangeDetectionStrategy, Component, ElementRef, model, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { ALL_EXAMS, CATEGORIES } from '../exam-list.data';

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

  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  // Header summary stats, derived once from the dataset.
  readonly examCount = ALL_EXAMS.length;
  readonly categoryCount = CATEGORIES.length - 1;
  readonly questionsLabel =
    (ALL_EXAMS.reduce((acc, e) => acc + e.q, 0) / 1000).toFixed(1).replace('.', ',') + ' tys.';
  readonly avgRating =
    (ALL_EXAMS.reduce((acc, e) => acc + e.rating, 0) / ALL_EXAMS.length)
      .toFixed(1)
      .replace('.', ',') + '★';

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
