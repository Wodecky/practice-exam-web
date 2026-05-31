import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { AppBarComponent } from '../shared/app-bar/app-bar.component';
import { DEFAULT_SETTINGS, EXAM_META, ExamResult, ExamSettings, POOL, shuffleArray } from './exam.data';
import { ExamRunnerComponent } from './runner/exam-runner.component';
import { ExamSetupComponent } from './setup/exam-setup.component';
import { ExamSummaryComponent } from './summary/exam-summary.component';
import type { Question } from './exam.data';

type Phase = 'setup' | 'running' | 'done';

@Component({
  selector: 'app-exam',
  imports: [AppBarComponent, ExamSetupComponent, ExamRunnerComponent, ExamSummaryComponent],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamComponent {
  readonly phase = signal<Phase>('setup');
  readonly settings = signal<ExamSettings>({ ...DEFAULT_SETTINGS });
  readonly session = signal<Question[]>([]);
  readonly result = signal<ExamResult | null>(null);
  readonly startedAt = signal<number>(0);

  readonly examMeta = EXAM_META;

  onStart(s: ExamSettings): void {
    const pool = s.shuffle ? shuffleArray(POOL) : [...POOL];
    this.session.set(pool.slice(0, EXAM_META.questionCount));
    this.settings.set(s);
    this.startedAt.set(Date.now());
    this.phase.set('running');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  onFinish(res: ExamResult): void {
    const durationSec = Math.round((Date.now() - this.startedAt()) / 1000);
    this.result.set({ ...res, durationSec });
    this.phase.set('done');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  onRestart(): void {
    this.onStart(this.settings());
  }

  onChangeSettings(): void {
    this.result.set(null);
    this.phase.set('setup');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}
