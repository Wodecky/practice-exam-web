import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface Step {
  n: string;
  icon: string;
  title: string;
  body: string;
  color: 'primary' | 'tertiary' | 'secondary';
  delayMs: number;
}

@Component({
  selector: 'app-how-it-works',
  imports: [MatIconModule],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowItWorksComponent {
  readonly steps: Step[] = [
    {
      n: '01',
      icon: 'topic',
      title: 'Wybierz swój egzamin',
      body: 'Mamy ponad 240 egzaminów — od matury po certyfikaty zawodowe. Nie ma Twojego? Wklej zakres i ścieżka powstanie w kilka sekund.',
      color: 'primary',
      delayMs: 0,
    },
    {
      n: '02',
      icon: 'tune',
      title: 'Ucz się tam, gdzie się zacinasz',
      body: 'Algorytm zauważa, na czym się potykasz, i podsuwa więcej takich pytań. Każde z wyjaśnieniem krok po kroku i odnośnikiem do źródła.',
      color: 'tertiary',
      delayMs: 80,
    },
    {
      n: '03',
      icon: 'verified',
      title: 'Wejdź na egzamin pewny siebie',
      body: 'Otrzymasz wskaźnik gotowości, trening słabych stron i pełnowymiarowy egzamin próbny na wieczór przed.',
      color: 'secondary',
      delayMs: 160,
    },
  ];
}
