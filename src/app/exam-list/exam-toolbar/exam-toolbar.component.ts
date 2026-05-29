import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { CATEGORIES, SORTS, SortId, ViewMode } from '../exam-list.data';

@Component({
  selector: 'app-exam-toolbar',
  imports: [MatIconModule],
  templateUrl: './exam-toolbar.component.html',
  styleUrl: './exam-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:mousedown)': 'onDocumentMousedown($event)',
    '(document:keydown.escape)': 'closeSort()',
  },
})
export class ExamToolbarComponent {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly category = model.required<string>();
  readonly sort = model.required<SortId>();
  readonly view = model.required<ViewMode>();
  readonly resultCount = input.required<number>();
  readonly totalCount = input.required<number>();

  readonly categories = CATEGORIES;
  readonly sorts = SORTS;
  readonly sortOpen = signal(false);

  readonly currentSortLabel = computed(() => SORTS.find((s) => s.id === this.sort())?.label ?? '');

  toggleSort(): void {
    this.sortOpen.update((open) => !open);
  }

  closeSort(): void {
    this.sortOpen.set(false);
  }

  selectSort(id: SortId): void {
    this.sort.set(id);
    this.closeSort();
  }

  onDocumentMousedown(event: MouseEvent): void {
    if (this.sortOpen() && !this.host.nativeElement.contains(event.target as Node)) {
      this.closeSort();
    }
  }
}
