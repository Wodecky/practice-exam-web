import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss',
})
export class NewsletterComponent {
  readonly emailControl = new FormControl('', {
    validators: [Validators.required, Validators.email],
    nonNullable: true,
  });
  readonly status = signal<'idle' | 'ok' | 'err'>('idle');
  readonly focused = signal(false);

  readonly hasValue = (): boolean => this.emailControl.value.length > 0;

  onFocus(): void {
    this.focused.set(true);
  }

  onBlur(): void {
    this.focused.set(false);
  }

  onInput(): void {
    if (this.status() === 'err') {
      this.status.set('idle');
    }
  }

  submit(event: Event): void {
    event.preventDefault();
    const email = this.emailControl.value;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      this.status.set('err');
      return;
    }
    this.status.set('ok');
    this.emailControl.setValue('');
    setTimeout(() => this.status.set('idle'), 4000);
  }
}
