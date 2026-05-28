import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Step {
  num: string;
  variant: 'primary' | 'tertiary' | 'secondary';
  icon: string;
  title: string;
  body: string;
}

@Component({
  selector: 'app-how-it-works',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss',
})
export class HowItWorksComponent {
  readonly steps: Step[] = [
    {
      num: '01',
      variant: 'primary',
      icon: 'topic',
      title: 'Wybierz swój egzamin',
      body: 'Mamy ponad 240 egzaminów — od matury po certyfikaty zawodowe. Nie ma Twojego? Wklej zakres i ścieżka powstanie w kilka sekund.',
    },
    {
      num: '02',
      variant: 'tertiary',
      icon: 'tune',
      title: 'Ucz się tam, gdzie się zacinasz',
      body: 'Algorytm zauważa, na czym się potykasz, i podsuwa więcej takich pytań. Każde z wyjaśnieniem krok po kroku i odnośnikiem do źródła.',
    },
    {
      num: '03',
      variant: 'secondary',
      icon: 'verified',
      title: 'Wejdź na egzamin pewny siebie',
      body: 'Otrzymasz wskaźnik gotowości, trening słabych stron i pełnowymiarowy egzamin próbny na wieczór przed.',
    },
  ];
}
