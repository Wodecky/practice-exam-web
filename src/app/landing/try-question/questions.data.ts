export interface QuestionOption {
  id: 'a' | 'b' | 'c' | 'd';
  text: string;
}

export interface Question {
  track: string;
  difficulty: 'Łatwe' | 'Średnie' | 'Trudne';
  prompt: string;
  options: QuestionOption[];
  answer: 'a' | 'b' | 'c' | 'd';
  explanation: string;
}

export const QUESTIONS: Question[] = [
  {
    track: 'Matura · Matematyka',
    difficulty: 'Średnie',
    prompt: 'W woreczku znajdują się 4 czerwone, 5 niebieskich i 3 zielone kule. Losujemy kolejno dwie kule bez zwracania. Jakie jest prawdopodobieństwo, że obie wylosowane kule będą niebieskie?',
    options: [
      { id: 'a', text: '5/33' },
      { id: 'b', text: '5/36' },
      { id: 'c', text: '25/144' },
      { id: 'd', text: '1/6' },
    ],
    answer: 'a',
    explanation: 'Liczba wszystkich par to C(12,2) = 66. Liczba par niebieskich to C(5,2) = 10. Stąd P = 10/66 = 5/33.',
  },
  {
    track: 'AWS · SAA-C03',
    difficulty: 'Trudne',
    prompt: 'Firma przechowuje w S3 obiekty rzadko używane, ale wymagające pobierania w milisekundach. Która klasa pamięci masowej jest najbardziej opłacalna?',
    options: [
      { id: 'a', text: 'S3 Glacier Deep Archive' },
      { id: 'b', text: 'S3 Standard-IA' },
      { id: 'c', text: 'S3 One Zone-IA' },
      { id: 'd', text: 'S3 Intelligent-Tiering — Archive Access' },
    ],
    answer: 'b',
    explanation: 'Klasa Standard-IA zapewnia milisekundowy dostęp przy niższym koszcie niż Standard i wyższej dostępności niż One Zone-IA — idealna do rzadko używanych danych z rygorystycznym SLA.',
  },
  {
    track: 'PMP',
    difficulty: 'Łatwe',
    prompt: 'Interesariusz w trakcie sprintu prosi o zmianę rozszerzającą zakres projektu. Zgodnie z PMBOK, co kierownik projektu powinien zrobić NAJPIERW?',
    options: [
      { id: 'a', text: 'Odrzucić zmianę — zakres jest zablokowany.' },
      { id: 'b', text: 'Zgłosić ją w procesie zintegrowanej kontroli zmian.' },
      { id: 'c', text: 'Wdrożyć od razu, by zadowolić interesariusza.' },
      { id: 'd', text: 'Dodać do backlogu następnego sprintu bez analizy.' },
    ],
    answer: 'b',
    explanation: 'Każda zmiana zakresu przechodzi przez zintegrowaną kontrolę zmian — ocenia się jej wpływ na harmonogram, koszt i ryzyko zanim zostanie zatwierdzona.',
  },
];
