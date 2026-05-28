import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly theme = signal<'light' | 'dark'>(this.initial());

  constructor() {
    effect(() => {
      this.doc.documentElement.setAttribute('data-theme', this.theme());
      localStorage.setItem('pracsis.theme', this.theme());
    });
  }

  toggle(): void {
    this.theme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }

  private initial(): 'light' | 'dark' {
    const saved = localStorage.getItem('pracsis.theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
