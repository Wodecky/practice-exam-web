import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Exam, EXAM_TABS, ExamTab } from './exams.data';

@Component({
  selector: 'app-exams',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamsComponent {
  readonly tabs: ExamTab[] = EXAM_TABS;
  readonly activeIdx = signal(0);

  readonly activeTab = computed(() => this.tabs[this.activeIdx()]);
  readonly activeExams = computed(() => this.activeTab().exams);
  readonly indicatorLeft = computed(
    () => `calc(${this.activeIdx()} * (var(--tab-w) + var(--tab-gap)))`
  );

  selectTab(idx: number): void {
    this.activeIdx.set(idx);
  }

  trackExam(_idx: number, exam: Exam): string {
    return this.activeTab().label + '_' + exam.name;
  }
}
