import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-newsletter',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsletterComponent {
  readonly emailControl = new FormControl<string>('', {
    validators: [Validators.required, Validators.email],
    nonNullable: true,
  });

  readonly status = signal<'idle' | 'ok' | 'err'>('idle');
  readonly focused = signal(false);

  get hasValue(): boolean {
    return this.emailControl.value.length > 0;
  }

  onSubmit(): void {
    if (!this.emailControl.valid) {
      this.status.set('err');
      this.emailControl.markAsTouched();
      return;
    }
    this.status.set('ok');
    this.emailControl.reset('');
    setTimeout(() => this.status.set('idle'), 4000);
  }

  onFocus(): void {
    this.focused.set(true);
    if (this.status() === 'err') {
      this.status.set('idle');
    }
  }

  onBlur(): void {
    this.focused.set(false);
  }
}
