import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppBarComponent } from '../shared/app-bar/app-bar.component';
import { ExamCardComponent } from './exam-card/exam-card.component';
import { ExamFiltersComponent } from './exam-filters/exam-filters.component';
import { ExamHeaderComponent } from './exam-header/exam-header.component';
import { ExamToolbarComponent } from './exam-toolbar/exam-toolbar.component';
import { ExamService } from './exam.service';
import {
  ALL_CATEGORY,
  DEFAULT_FILTERS,
  ExamFilters,
  SORT_COMPARATORS,
  SortId,
  ViewMode,
} from './exam-list.data';

@Component({
  selector: 'app-exam-list',
  imports: [
    MatIconModule,
    MatProgressSpinnerModule,
    AppBarComponent,
    ExamHeaderComponent,
    ExamFiltersComponent,
    ExamToolbarComponent,
    ExamCardComponent,
  ],
  templateUrl: './exam-list.component.html',
  styleUrl: './exam-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamListComponent {
  private readonly examService = inject(ExamService);

  readonly examsResource = rxResource({
    loader: () => firstValueFrom(this.examService.getExams()),
  });

  readonly exams = computed(() => this.examsResource.value() ?? []);
  readonly totalCount = computed(() => this.exams().length);

  readonly query = signal('');
  readonly category = signal<string>(ALL_CATEGORY);
  readonly sort = signal<SortId>('popular');
  readonly view = signal<ViewMode>('grid');
  readonly filters = signal<ExamFilters>({ ...DEFAULT_FILTERS, diffs: [] });

  readonly filtered = computed(() => {
    const query = this.query().trim().toLowerCase();
    const category = this.category();
    const { diffs, popularOnly, newOnly, minQ, minRating } = this.filters();

    const result = this.exams().filter((e) => {
      if (
        query &&
        !e.name.toLowerCase().includes(query) &&
        !e.desc.toLowerCase().includes(query) &&
        !e.category.toLowerCase().includes(query)
      ) {
        return false;
      }
      if (category !== ALL_CATEGORY && e.category !== category) return false;
      if (diffs.length && !diffs.includes(e.diff)) return false;
      if (popularOnly && !e.popular) return false;
      if (newOnly && !e.isNew) return false;
      if (minQ && e.q < minQ) return false;
      if (minRating && e.rating < minRating) return false;
      return true;
    });

    return result.sort(SORT_COMPARATORS[this.sort()]);
  });

  resetAll(): void {
    this.query.set('');
    this.category.set(ALL_CATEGORY);
    this.filters.set({ ...DEFAULT_FILTERS, diffs: [] });
  }

  animationDelay(index: number): string {
    return `${Math.min(index, 12) * 35}ms`;
  }
}
