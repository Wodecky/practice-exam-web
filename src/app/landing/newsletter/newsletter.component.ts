import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { timer } from 'rxjs';

@Component({
  selector: 'app-newsletter',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsletterComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly emailControl = new FormControl<string>('', {
    validators: [Validators.required, Validators.email],
    nonNullable: true,
  });

  readonly status = signal<'idle' | 'ok' | 'err'>('idle');
  readonly focused = signal(false);

  private readonly value = toSignal(this.emailControl.valueChanges, { initialValue: '' });
  readonly hasValue = computed(() => this.value().length > 0);

  onSubmit(): void {
    if (!this.emailControl.valid) {
      this.status.set('err');
      this.emailControl.markAsTouched();
      return;
    }
    this.status.set('ok');
    this.emailControl.reset('');
    timer(4000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.status.set('idle'));
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
