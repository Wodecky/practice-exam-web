import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
  output,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterLink } from '@angular/router';

import { EXAM_META, ExamSettings } from '../exam.data';

@Component({
  selector: 'app-exam-setup',
  imports: [MatIconModule, MatSlideToggleModule, RouterLink],
  templateUrl: './exam-setup.component.html',
  styleUrl: './exam-setup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamSetupComponent implements OnInit {
  initialSettings = input<ExamSettings>();
  start = output<ExamSettings>();

  readonly examMeta = EXAM_META;

  readonly mode = signal<'exam' | 'training'>('exam');
  readonly shuffle = signal(true);

  ngOnInit(): void {
    const s = this.initialSettings();
    if (s) {
      this.mode.set(s.mode);
      this.shuffle.set(s.shuffle);
    }
  }

  setMode(m: 'exam' | 'training'): void {
    this.mode.set(m);
  }

  setShuffle(checked: boolean): void {
    this.shuffle.set(checked);
  }

  onStart(): void {
    this.start.emit({ mode: this.mode(), shuffle: this.shuffle() });
  }
}
