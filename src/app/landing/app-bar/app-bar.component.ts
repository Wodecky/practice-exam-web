import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '[class.scrolled]': 'scrolled()',
    role: 'banner',
  },
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
})
export class AppBarComponent {
  private readonly theme = inject(ThemeService);
  readonly scrolled = signal(false);
  readonly themeMode = this.theme.theme;

  onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }

  toggleTheme(): void {
    this.theme.toggle();
  }
}
