import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  signal,
  viewChildren,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { EXAM_TABS, ExamTab } from './exams.data';

@Component({
  selector: 'app-exams',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'remeasure()',
  },
})
export class ExamsComponent {
  readonly tabs: ExamTab[] = EXAM_TABS;
  readonly activeIdx = signal(0);

  readonly activeTab = computed(() => this.tabs[this.activeIdx()]);
  readonly activeExams = computed(() => this.activeTab().exams);

  readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabBtn');

  private readonly indicatorMetrics = signal({ left: 0, width: 0 });
  readonly indicatorLeft = computed(() => `${this.indicatorMetrics().left}px`);
  readonly indicatorWidth = computed(() => `${this.indicatorMetrics().width}px`);

  constructor() {
    afterRenderEffect(() => {
      const buttons = this.tabButtons();
      const idx = this.activeIdx();
      const el = buttons[idx]?.nativeElement;
      if (!el) return;
      this.indicatorMetrics.set({ left: el.offsetLeft, width: el.offsetWidth });
    });
  }

  selectTab(idx: number): void {
    this.activeIdx.set(idx);
  }

  remeasure(): void {
    const el = this.tabButtons()[this.activeIdx()]?.nativeElement;
    if (!el) return;
    this.indicatorMetrics.set({ left: el.offsetLeft, width: el.offsetWidth });
  }

  onTabKeydown(event: KeyboardEvent, idx: number): void {
    let nextIdx = idx;
    switch (event.key) {
      case 'ArrowRight':
        nextIdx = (idx + 1) % this.tabs.length;
        break;
      case 'ArrowLeft':
        nextIdx = (idx - 1 + this.tabs.length) % this.tabs.length;
        break;
      case 'Home':
        nextIdx = 0;
        break;
      case 'End':
        nextIdx = this.tabs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    this.selectTab(nextIdx);
    this.tabButtons()[nextIdx]?.nativeElement.focus();
  }
}
