export interface Question {
  id: number;
  topic: string;
  diff: 'Łatwe' | 'Średnie' | 'Trudne';
  prompt: string;
  options: { id: string; text: string }[];
  answer: string;
  explanation: string;
}

export interface ExamSettings {
  mode: 'exam' | 'training';
  shuffle: boolean;
}

export interface ExamResult {
  answers: Record<number, string>;
  flagged: Record<number, boolean>;
  durationSec: number;
  timeUp: boolean;
}

export const EXAM_META = {
  id: 'matura-mat',
  name: 'Matura — Matematyka',
  category: 'Akademickie',
  icon: 'function',
  questionCount: 20,
  minutes: 40,
} as const;

export const DEFAULT_SETTINGS: ExamSettings = {
  mode: 'exam',
  shuffle: true,
};

export const POOL: Question[] = [
  {
    id: 1,
    topic: 'Prawdopodobieństwo',
    diff: 'Średnie',
    prompt:
      'W woreczku są 4 czerwone, 5 niebieskich i 3 zielone kule. Losujemy kolejno dwie kule bez zwracania. Jakie jest prawdopodobieństwo, że obie wylosowane kule będą niebieskie?',
    options: [
      { id: 'a', text: '5/33' },
      { id: 'b', text: '5/36' },
      { id: 'c', text: '25/144' },
      { id: 'd', text: '1/6' },
    ],
    answer: 'a',
    explanation: 'C(5,2)/C(12,2) = 10/66 = 5/33.',
  },
  {
    id: 2,
    topic: 'Algebra',
    diff: 'Łatwe',
    prompt: 'Wyrażenie (2x − 3)² jest równe:',
    options: [
      { id: 'a', text: '4x² − 9' },
      { id: 'b', text: '4x² + 12x + 9' },
      { id: 'c', text: '4x² − 12x + 9' },
      { id: 'd', text: '2x² − 12x + 9' },
    ],
    answer: 'c',
    explanation: '(2x − 3)² = 4x² − 2·(2x)·3 + 9 = 4x² − 12x + 9.',
  },
  {
    id: 3,
    topic: 'Geometria',
    diff: 'Średnie',
    prompt: 'Pole trójkąta o bokach 5, 12 i 13 wynosi:',
    options: [
      { id: 'a', text: '30' },
      { id: 'b', text: '32,5' },
      { id: 'c', text: '60' },
      { id: 'd', text: '65/2' },
    ],
    answer: 'a',
    explanation: '5–12–13 to trójkąt prostokątny. P = ½·5·12 = 30.',
  },
  {
    id: 4,
    topic: 'Funkcje',
    diff: 'Średnie',
    prompt: 'Dla jakiej wartości parametru m funkcja f(x) = mx² − 2x + 1 ma jedno miejsce zerowe?',
    options: [
      { id: 'a', text: 'm = 0' },
      { id: 'b', text: 'm = 1' },
      { id: 'c', text: 'm = −1' },
      { id: 'd', text: 'm = 1 lub m = 0' },
    ],
    answer: 'd',
    explanation:
      'Dla m = 0 to funkcja liniowa o jednym zerze. Dla m ≠ 0 wymagamy Δ = 0, czyli 4 − 4m = 0, m = 1.',
  },
  {
    id: 5,
    topic: 'Ciągi',
    diff: 'Łatwe',
    prompt: 'W ciągu arytmetycznym a₁ = 3, a₅ = 19. Ile wynosi różnica r?',
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '4' },
      { id: 'c', text: '5' },
      { id: 'd', text: '16' },
    ],
    answer: 'b',
    explanation: 'a₅ = a₁ + 4r, więc 19 = 3 + 4r, r = 4.',
  },
  {
    id: 6,
    topic: 'Logarytmy',
    diff: 'Średnie',
    prompt: 'log₂ 8 + log₃ 9 jest równe:',
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '5' },
      { id: 'c', text: '6' },
      { id: 'd', text: '17' },
    ],
    answer: 'b',
    explanation: 'log₂ 8 = 3, log₃ 9 = 2. Suma = 5.',
  },
  {
    id: 7,
    topic: 'Trygonometria',
    diff: 'Trudne',
    prompt: 'Jeśli sin α = 3/5 i α ∈ (π/2, π), to cos α wynosi:',
    options: [
      { id: 'a', text: '4/5' },
      { id: 'b', text: '−4/5' },
      { id: 'c', text: '−3/5' },
      { id: 'd', text: '7/5' },
    ],
    answer: 'b',
    explanation:
      'sin² + cos² = 1, więc cos² = 16/25. W II ćwiartce cos < 0, więc cos α = −4/5.',
  },
  {
    id: 8,
    topic: 'Stereometria',
    diff: 'Trudne',
    prompt: 'Objętość sześcianu o przekątnej długości 6√3 wynosi:',
    options: [
      { id: 'a', text: '27' },
      { id: 'b', text: '216' },
      { id: 'c', text: '108√3' },
      { id: 'd', text: '729' },
    ],
    answer: 'b',
    explanation: 'Przekątna sześcianu = a√3, więc a = 6. V = 6³ = 216.',
  },
  {
    id: 9,
    topic: 'Statystyka',
    diff: 'Łatwe',
    prompt: 'Średnia arytmetyczna liczb 4, 7, 9, 12, 8 wynosi:',
    options: [
      { id: 'a', text: '7' },
      { id: 'b', text: '8' },
      { id: 'c', text: '9' },
      { id: 'd', text: '10' },
    ],
    answer: 'b',
    explanation: '(4 + 7 + 9 + 12 + 8) / 5 = 40 / 5 = 8.',
  },
  {
    id: 10,
    topic: 'Równania',
    diff: 'Średnie',
    prompt: 'Suma pierwiastków równania x² − 7x + 10 = 0 wynosi:',
    options: [
      { id: 'a', text: '−7' },
      { id: 'b', text: '7' },
      { id: 'c', text: '10' },
      { id: 'd', text: '−10' },
    ],
    answer: 'b',
    explanation: 'Wzory Viète’a: x₁ + x₂ = −b/a = 7.',
  },
  {
    id: 11,
    topic: 'Geometria analityczna',
    diff: 'Średnie',
    prompt: 'Środek odcinka o końcach A(−2, 5) i B(6, −1) ma współrzędne:',
    options: [
      { id: 'a', text: '(2, 2)' },
      { id: 'b', text: '(4, 4)' },
      { id: 'c', text: '(2, 3)' },
      { id: 'd', text: '(4, 2)' },
    ],
    answer: 'a',
    explanation: 'Środek = ((−2+6)/2, (5−1)/2) = (2, 2).',
  },
  {
    id: 12,
    topic: 'Procenty',
    diff: 'Łatwe',
    prompt:
      'Cenę towaru najpierw obniżono o 20%, a następnie podwyższono o 25%. Jak zmieniła się cena względem początkowej?',
    options: [
      { id: 'a', text: 'pozostała bez zmian' },
      { id: 'b', text: 'wzrosła o 5%' },
      { id: 'c', text: 'spadła o 5%' },
      { id: 'd', text: 'wzrosła o 25%' },
    ],
    answer: 'a',
    explanation: '0,8 · 1,25 = 1,00 — cena nie zmieniła się.',
  },
  {
    id: 13,
    topic: 'Funkcja wykładnicza',
    diff: 'Trudne',
    prompt: 'Rozwiązaniem równania 2^(x+1) = 32 jest:',
    options: [
      { id: 'a', text: 'x = 4' },
      { id: 'b', text: 'x = 5' },
      { id: 'c', text: 'x = 6' },
      { id: 'd', text: 'x = 16' },
    ],
    answer: 'a',
    explanation: '32 = 2⁵, więc x + 1 = 5, czyli x = 4.',
  },
  {
    id: 14,
    topic: 'Wielomiany',
    diff: 'Średnie',
    prompt: 'Reszta z dzielenia wielomianu W(x) = x³ − 2x + 5 przez (x − 1) wynosi:',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '4' },
      { id: 'c', text: '5' },
      { id: 'd', text: '6' },
    ],
    answer: 'b',
    explanation: 'Twierdzenie Bézouta: reszta = W(1) = 1 − 2 + 5 = 4.',
  },
  {
    id: 15,
    topic: 'Kombinatoryka',
    diff: 'Średnie',
    prompt: 'Na ile sposobów można ustawić 5 różnych książek na półce?',
    options: [
      { id: 'a', text: '25' },
      { id: 'b', text: '60' },
      { id: 'c', text: '120' },
      { id: 'd', text: '720' },
    ],
    answer: 'c',
    explanation: '5! = 120.',
  },
  {
    id: 16,
    topic: 'Wartość bezwzględna',
    diff: 'Łatwe',
    prompt: 'Zbiorem rozwiązań nierówności |x − 3| < 2 jest:',
    options: [
      { id: 'a', text: '(1, 5)' },
      { id: 'b', text: '[1, 5]' },
      { id: 'c', text: '(−∞, 1) ∪ (5, ∞)' },
      { id: 'd', text: '(−5, 5)' },
    ],
    answer: 'a',
    explanation: '|x − 3| < 2 ⇔ −2 < x − 3 < 2 ⇔ x ∈ (1, 5).',
  },
  {
    id: 17,
    topic: 'Geometria',
    diff: 'Trudne',
    prompt: 'W okręgu o promieniu 5 cięciwa odległa od środka o 3 ma długość:',
    options: [
      { id: 'a', text: '4' },
      { id: 'b', text: '6' },
      { id: 'c', text: '8' },
      { id: 'd', text: '10' },
    ],
    answer: 'c',
    explanation: 'Połowa cięciwy = √(5² − 3²) = 4, więc cała cięciwa ma długość 8.',
  },
  {
    id: 18,
    topic: 'Pochodne',
    diff: 'Trudne',
    prompt: 'Pochodna funkcji f(x) = x³ − 3x² + 2 wynosi:',
    options: [
      { id: 'a', text: '3x² − 6x' },
      { id: 'b', text: '3x² − 3x' },
      { id: 'c', text: 'x² − 6x + 2' },
      { id: 'd', text: '3x² − 6x + 2' },
    ],
    answer: 'a',
    explanation: "f'(x) = 3x² − 6x.",
  },
  {
    id: 19,
    topic: 'Funkcje',
    diff: 'Łatwe',
    prompt: 'Wierzchołek paraboli y = x² − 4x + 7 ma współrzędne:',
    options: [
      { id: 'a', text: '(2, 3)' },
      { id: 'b', text: '(−2, 3)' },
      { id: 'c', text: '(2, 7)' },
      { id: 'd', text: '(4, 7)' },
    ],
    answer: 'a',
    explanation: 'x_w = −b/(2a) = 2, y_w = 4 − 8 + 7 = 3.',
  },
  {
    id: 20,
    topic: 'Procenty',
    diff: 'Średnie',
    prompt:
      'Po wpłaceniu 2 000 zł na lokatę roczną o oprocentowaniu 5% rocznie (kapitalizacja roczna), po jednym roku na lokacie będzie:',
    options: [
      { id: 'a', text: '2 050 zł' },
      { id: 'b', text: '2 100 zł' },
      { id: 'c', text: '2 500 zł' },
      { id: 'd', text: '2 005 zł' },
    ],
    answer: 'b',
    explanation: '2000 · 1,05 = 2100 zł.',
  },
];

export function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
