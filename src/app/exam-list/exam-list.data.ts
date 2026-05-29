export type Difficulty = 'Łatwe' | 'Średnie' | 'Trudne';
export type ExamColor = 'primary' | 'tertiary' | 'secondary';
export type SortId = 'popular' | 'students' | 'questions' | 'rating' | 'new' | 'name';
export type ViewMode = 'grid' | 'list';

export interface Exam {
  id: string;
  name: string;
  category: string;
  icon: string;
  /** Number of questions in the bank. */
  q: number;
  diff: Difficulty;
  /** Estimated exam length in minutes. */
  mins: number;
  students: number;
  rating: number;
  popular: boolean;
  isNew: boolean;
  desc: string;
  color: ExamColor;
}

export interface SortOption {
  id: SortId;
  label: string;
}

export interface ExamFilters {
  diffs: Difficulty[];
  popularOnly: boolean;
  newOnly: boolean;
  minQ: number;
  minRating: number;
}

export const DEFAULT_FILTERS: ExamFilters = {
  diffs: [],
  popularOnly: false,
  newOnly: false,
  minQ: 0,
  minRating: 0,
};

export const ALL_CATEGORY = 'Wszystkie';

export const CATEGORIES: readonly string[] = [
  ALL_CATEGORY,
  'Akademickie',
  'Technologia',
  'Zawodowe',
  'Medyczne',
  'Licencje',
];

export const SORTS: readonly SortOption[] = [
  { id: 'popular', label: 'Polecane' },
  { id: 'students', label: 'Najpopularniejsze' },
  { id: 'questions', label: 'Najwięcej pytań' },
  { id: 'rating', label: 'Najwyżej oceniane' },
  { id: 'new', label: 'Najnowsze' },
  { id: 'name', label: 'Alfabetycznie' },
];

// Comparators for each sort option, applied to the filtered result set.
export const SORT_COMPARATORS: Record<SortId, (a: Exam, b: Exam) => number> = {
  popular: (a, b) => Number(b.popular) - Number(a.popular) || b.students - a.students,
  students: (a, b) => b.students - a.students,
  questions: (a, b) => b.q - a.q,
  rating: (a, b) => b.rating - a.rating,
  new: (a, b) => Number(b.isNew) - Number(a.isNew) || b.students - a.students,
  name: (a, b) => a.name.localeCompare(b.name, 'pl'),
};

export const DIFFICULTIES: readonly Difficulty[] = ['Łatwe', 'Średnie', 'Trudne'];

export const RATING_THRESHOLDS: readonly number[] = [4.0, 4.5, 4.7, 4.8];

export const ALL_EXAMS: readonly Exam[] = [
  // Akademickie
  {
    id: 'matura-mat',
    name: 'Matura — Matematyka',
    category: 'Akademickie',
    icon: 'school',
    q: 4820,
    diff: 'Średnie',
    mins: 170,
    students: 28400,
    rating: 4.8,
    popular: true,
    isNew: false,
    desc: 'Pełne przygotowanie do matury z matematyki — poziom podstawowy i rozszerzony.',
    color: 'primary',
  },
  {
    id: 'matura-pol',
    name: 'Matura — Język polski',
    category: 'Akademickie',
    icon: 'menu_book',
    q: 3140,
    diff: 'Średnie',
    mins: 240,
    students: 19600,
    rating: 4.7,
    popular: false,
    isNew: false,
    desc: 'Lektury, gramatyka, analiza tekstu i wypracowanie maturalne.',
    color: 'primary',
  },
  {
    id: 'matura-ang',
    name: 'Matura — Angielski',
    category: 'Akademickie',
    icon: 'translate',
    q: 2240,
    diff: 'Łatwe',
    mins: 150,
    students: 24200,
    rating: 4.7,
    popular: false,
    isNew: false,
    desc: 'Rozumienie ze słuchu, czytanie, gramatyka i wypowiedź pisemna.',
    color: 'primary',
  },
  {
    id: 'osma',
    name: 'Egzamin ósmoklasisty',
    category: 'Akademickie',
    icon: 'function',
    q: 1980,
    diff: 'Łatwe',
    mins: 100,
    students: 16800,
    rating: 4.6,
    popular: false,
    isNew: false,
    desc: 'Matematyka, polski i język obcy w jednym miejscu.',
    color: 'primary',
  },
  {
    id: 'ielts',
    name: 'IELTS Academic',
    category: 'Akademickie',
    icon: 'language',
    q: 2460,
    diff: 'Trudne',
    mins: 165,
    students: 12300,
    rating: 4.9,
    popular: false,
    isNew: true,
    desc: 'Cztery moduły IELTS z naciskiem na band 7+.',
    color: 'tertiary',
  },

  // Technologia
  {
    id: 'aws-saa',
    name: 'AWS Solutions Architect',
    category: 'Technologia',
    icon: 'cloud',
    q: 1720,
    diff: 'Trudne',
    mins: 130,
    students: 41200,
    rating: 4.9,
    popular: true,
    isNew: false,
    desc: 'Pełne pokrycie SAA-C03: sieci, storage, bezpieczeństwo, koszt.',
    color: 'primary',
  },
  {
    id: 'ckad',
    name: 'CKAD — Kubernetes',
    category: 'Technologia',
    icon: 'developer_board',
    q: 640,
    diff: 'Trudne',
    mins: 120,
    students: 8400,
    rating: 4.8,
    popular: false,
    isNew: false,
    desc: 'Praktyczne ćwiczenia z YAML, deploymenty, networking.',
    color: 'tertiary',
  },
  {
    id: 'fe-int',
    name: 'Frontend — rekrutacja',
    category: 'Technologia',
    icon: 'code',
    q: 980,
    diff: 'Średnie',
    mins: 60,
    students: 21300,
    rating: 4.7,
    popular: true,
    isNew: false,
    desc: 'JavaScript, React, system design, struktury danych.',
    color: 'secondary',
  },
  {
    id: 'gcp-ace',
    name: 'Google Cloud ACE',
    category: 'Technologia',
    icon: 'cloud_sync',
    q: 1210,
    diff: 'Średnie',
    mins: 120,
    students: 7100,
    rating: 4.6,
    popular: false,
    isNew: true,
    desc: 'Plan szkolenia 2025 zgodny z aktualnym blueprintem.',
    color: 'primary',
  },
  {
    id: 'angular-cert',
    name: 'Angular — certyfikacja',
    category: 'Technologia',
    icon: 'web',
    q: 540,
    diff: 'Średnie',
    mins: 90,
    students: 5800,
    rating: 4.8,
    popular: false,
    isNew: true,
    desc: 'Sygnały, RxJS, formularze, routing, testy jednostkowe.',
    color: 'tertiary',
  },

  // Zawodowe
  {
    id: 'pmp',
    name: 'PMP',
    category: 'Zawodowe',
    icon: 'workspaces',
    q: 2340,
    diff: 'Trudne',
    mins: 230,
    students: 33700,
    rating: 4.9,
    popular: true,
    isNew: false,
    desc: 'Pełne pokrycie PMBOK 7 z naciskiem na metodyki zwinne.',
    color: 'primary',
  },
  {
    id: 'cfa1',
    name: 'CFA Level I',
    category: 'Zawodowe',
    icon: 'finance_mode',
    q: 3820,
    diff: 'Trudne',
    mins: 270,
    students: 18500,
    rating: 4.8,
    popular: false,
    isNew: false,
    desc: 'Dziesięć obszarów tematycznych z aktualnymi pytaniami CFA Institute.',
    color: 'tertiary',
  },
  {
    id: 'acca',
    name: 'ACCA F1–F3',
    category: 'Zawodowe',
    icon: 'gavel',
    q: 1640,
    diff: 'Średnie',
    mins: 180,
    students: 9200,
    rating: 4.6,
    popular: false,
    isNew: false,
    desc: 'Symulacje zadań egzaminacyjnych z trzech modułów ACCA.',
    color: 'secondary',
  },
  {
    id: 'sixsigma',
    name: 'Six Sigma Green Belt',
    category: 'Zawodowe',
    icon: 'analytics',
    q: 720,
    diff: 'Średnie',
    mins: 90,
    students: 4300,
    rating: 4.7,
    popular: false,
    isNew: false,
    desc: 'Cykl DMAIC, narzędzia statystyczne, case studies.',
    color: 'primary',
  },

  // Medyczne
  {
    id: 'lek',
    name: 'LEK — Lekarski',
    category: 'Medyczne',
    icon: 'stethoscope',
    q: 5420,
    diff: 'Trudne',
    mins: 300,
    students: 16800,
    rating: 4.9,
    popular: true,
    isNew: false,
    desc: 'Najważniejsze tematy z każdej dziedziny — od chorób wewnętrznych po pediatrię.',
    color: 'primary',
  },
  {
    id: 'pes-ped',
    name: 'PES — Pediatria',
    category: 'Medyczne',
    icon: 'medical_services',
    q: 3260,
    diff: 'Trudne',
    mins: 240,
    students: 2400,
    rating: 4.8,
    popular: false,
    isNew: false,
    desc: 'Pełen zakres specjalizacji z aktualną podstawą programową.',
    color: 'tertiary',
  },
  {
    id: 'ldek',
    name: 'LDEK — Stomatologia',
    category: 'Medyczne',
    icon: 'psychology',
    q: 1140,
    diff: 'Trudne',
    mins: 200,
    students: 3100,
    rating: 4.7,
    popular: false,
    isNew: false,
    desc: 'Pełen zakres LDEK — protetyka, chirurgia, ortodoncja, endodoncja.',
    color: 'secondary',
  },
  {
    id: 'piel',
    name: 'Pielęgniarstwo PWZ',
    category: 'Medyczne',
    icon: 'monitor_heart',
    q: 2080,
    diff: 'Średnie',
    mins: 180,
    students: 6700,
    rating: 4.7,
    popular: false,
    isNew: false,
    desc: 'Cały program zgodny z aktualnym programem nauczania pielęgniarstwa.',
    color: 'primary',
  },

  // Licencje
  {
    id: 'pj-b',
    name: 'Prawo jazdy kat. B',
    category: 'Licencje',
    icon: 'directions_car',
    q: 1240,
    diff: 'Łatwe',
    mins: 25,
    students: 87400,
    rating: 4.8,
    popular: true,
    isNew: false,
    desc: 'Wszystkie pytania z bazy WORD — także te z trudnymi wizualizacjami.',
    color: 'primary',
  },
  {
    id: 'pj-c',
    name: 'Prawo jazdy kat. C',
    category: 'Licencje',
    icon: 'local_shipping',
    q: 980,
    diff: 'Średnie',
    mins: 30,
    students: 14200,
    rating: 4.6,
    popular: false,
    isNew: false,
    desc: 'Kategoria C wraz z kwalifikacją wstępną i okresową.',
    color: 'primary',
  },
  {
    id: 'posrednik',
    name: 'Pośrednik nieruchomości',
    category: 'Licencje',
    icon: 'home_work',
    q: 920,
    diff: 'Średnie',
    mins: 120,
    students: 3200,
    rating: 4.7,
    popular: false,
    isNew: true,
    desc: 'Państwowe i lokalne przepisy, podatki, prawo rzeczowe.',
    color: 'tertiary',
  },
  {
    id: 'ppl',
    name: 'Licencja PPL — Pilot',
    category: 'Licencje',
    icon: 'flight',
    q: 780,
    diff: 'Trudne',
    mins: 150,
    students: 1800,
    rating: 4.8,
    popular: false,
    isNew: false,
    desc: 'Pakiet 9 przedmiotów zgodny ze specyfikacją EASA.',
    color: 'secondary',
  },
  {
    id: 'makler',
    name: 'Egzamin maklerski',
    category: 'Licencje',
    icon: 'show_chart',
    q: 1560,
    diff: 'Trudne',
    mins: 240,
    students: 1100,
    rating: 4.5,
    popular: false,
    isNew: false,
    desc: 'Specyfikacja KNF, instrumenty finansowe, etyka.',
    color: 'primary',
  },
];
