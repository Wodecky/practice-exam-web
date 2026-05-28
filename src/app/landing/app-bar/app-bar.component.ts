import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-bar',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBarComponent {
  private readonly themeService = inject(ThemeService);
  private readonly destroyRef = inject(DestroyRef);

  readonly sentinel = viewChild.required<ElementRef<HTMLElement>>('sentinel');
  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);
  readonly isDark = computed(() => this.themeService.theme() === 'dark');

  constructor() {
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        ([entry]) => this.scrolled.set(!entry.isIntersecting),
        { rootMargin: '-8px 0px 0px 0px', threshold: 0 },
      );
      observer.observe(this.sentinel().nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  toggleTheme() {
    this.themeService.toggle();
  }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }
}
