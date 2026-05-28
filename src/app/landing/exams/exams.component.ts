import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { EXAM_TABS } from './exams.data';

@Component({
  selector: 'app-exams',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent {
  readonly tabs = EXAM_TABS;
  readonly selectedTab = signal(0);
  readonly currentExams = computed(() => this.tabs[this.selectedTab()].exams);
  readonly tabIndicatorLeft = computed(() => `${this.selectedTab() * (132 + 4)}px`);

  selectTab(index: number): void {
    this.selectedTab.set(index);
  }
}
