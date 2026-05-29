import { ChangeDetectionStrategy, Component, computed, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import {
  DEFAULT_FILTERS,
  DIFFICULTIES,
  Difficulty,
  ExamFilters,
  RATING_THRESHOLDS,
} from '../exam-list.data';

@Component({
  selector: 'app-exam-filters',
  imports: [MatIconModule],
  templateUrl: './exam-filters.component.html',
  styleUrl: './exam-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamFiltersComponent {
  readonly filters = model.required<ExamFilters>();

  readonly difficulties = DIFFICULTIES;
  readonly ratingThresholds = RATING_THRESHOLDS;

  readonly minQLabel = computed(() => {
    const minQ = this.filters().minQ;
    return minQ === 0 ? 'Dowolnie' : `${minQ.toLocaleString('pl-PL')}+`;
  });

  reset(): void {
    this.filters.set({ ...DEFAULT_FILTERS, diffs: [] });
  }

  toggleDiff(diff: Difficulty): void {
    this.filters.update((f) => ({
      ...f,
      diffs: f.diffs.includes(diff) ? f.diffs.filter((d) => d !== diff) : [...f.diffs, diff],
    }));
  }

  setPopularOnly(value: boolean): void {
    this.filters.update((f) => ({ ...f, popularOnly: value }));
  }

  setNewOnly(value: boolean): void {
    this.filters.update((f) => ({ ...f, newOnly: value }));
  }

  setMinQ(value: number): void {
    this.filters.update((f) => ({ ...f, minQ: value }));
  }

  toggleRating(rating: number): void {
    this.filters.update((f) => ({ ...f, minRating: f.minRating === rating ? 0 : rating }));
  }

  ratingLabel(rating: number): string {
    return `${rating.toString().replace('.', ',')}+`;
  }
}
