import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-bar',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
  },
})
export class AppBarComponent {
  private readonly themeService = inject(ThemeService);

  readonly scrolled = signal(false);
  readonly isDark = computed(() => this.themeService.theme() === 'dark');

  onScroll() {
    this.scrolled.set(window.scrollY > 8);
  }

  toggleTheme() {
    this.themeService.toggle();
  }
}
