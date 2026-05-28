export interface Exam {
  name: string;
  icon: string;
  count: string;
  meta: string;
  popular?: boolean;
  iconVariant: 'primary' | 'tertiary' | 'secondary';
}

export interface ExamTab {
  id: string;
  label: string;
  exams: Exam[];
}

export const EXAM_TABS: ExamTab[] = [
  {
    id: 'akademickie',
    label: 'Akademickie',
    exams: [
      { name: 'Matura — Matematyka', icon: 'school', count: '4 820 pytań', meta: 'Średnia poprawa +18 pkt', popular: true, iconVariant: 'primary' },
      { name: 'Matura — Język polski', icon: 'menu_book', count: '3 140 pytań', meta: 'Rozszerzenie + podstawa', iconVariant: 'secondary' },
      { name: 'Egzamin ósmoklasisty', icon: 'function', count: '1 980 pytań', meta: 'Wszystkie przedmioty', iconVariant: 'tertiary' },
      { name: 'IELTS Academic', icon: 'translate', count: '2 460 pytań', meta: 'Cel: poziom 7+', iconVariant: 'primary' },
    ],
  },
  {
    id: 'technologia',
    label: 'Technologia',
    exams: [
      { name: 'AWS Solutions Architect', icon: 'cloud', count: '1 720 pytań', meta: 'Zgodne z SAA-C03', popular: true, iconVariant: 'primary' },
      { name: 'CKAD — Kubernetes', icon: 'developer_board', count: '640 pytań', meta: 'Ćwiczenia z YAML', iconVariant: 'secondary' },
      { name: 'Frontend — rekrutacja', icon: 'code', count: '980 pytań', meta: 'JS · React · System', iconVariant: 'tertiary' },
      { name: 'Google Cloud ACE', icon: 'cloud_sync', count: '1 210 pytań', meta: 'Plan szkolenia 2025', iconVariant: 'primary' },
    ],
  },
  {
    id: 'zawodowe',
    label: 'Zawodowe',
    exams: [
      { name: 'PMP', icon: 'workspaces', count: '2 340 pytań', meta: 'PMBOK 7 + Agile', popular: true, iconVariant: 'primary' },
      { name: 'CFA Level I', icon: 'finance_mode', count: '3 820 pytań', meta: '10 obszarów tematycznych', iconVariant: 'secondary' },
      { name: 'ACCA F1–F3', icon: 'gavel', count: '1 640 pytań', meta: 'Symulacje zadań', iconVariant: 'tertiary' },
      { name: 'Six Sigma Green Belt', icon: 'analytics', count: '720 pytań', meta: 'Cykl DMAIC', iconVariant: 'primary' },
    ],
  },
  {
    id: 'medyczne',
    label: 'Medyczne',
    exams: [
      { name: 'LEK — Lekarski', icon: 'stethoscope', count: '5 420 pytań', meta: 'Najważniejsze tematy', popular: true, iconVariant: 'primary' },
      { name: 'PES — Pediatria', icon: 'medical_services', count: '3 260 pytań', meta: 'Aktualna podstawa', iconVariant: 'secondary' },
      { name: 'LDEK — Stomatologia', icon: 'psychology', count: '1 140 pytań', meta: 'Pełen zakres', iconVariant: 'tertiary' },
      { name: 'Pielęgniarstwo PWZ', icon: 'monitor_heart', count: '2 080 pytań', meta: 'Cały program', iconVariant: 'primary' },
    ],
  },
  {
    id: 'licencje',
    label: 'Licencje',
    exams: [
      { name: 'Prawo jazdy kat. B', icon: 'directions_car', count: '1 240 pytań', meta: 'Wszystkie kategorie', iconVariant: 'secondary' },
      { name: 'Pośrednik nieruchomości', icon: 'home_work', count: '920 pytań', meta: 'Państwowe + lokalne', popular: true, iconVariant: 'primary' },
      { name: 'Licencja PPL — Pilot', icon: 'flight', count: '780 pytań', meta: 'Zgodne z EASA', iconVariant: 'tertiary' },
      { name: 'Egzamin maklerski', icon: 'show_chart', count: '1 560 pytań', meta: 'Specyfikacja KNF', iconVariant: 'secondary' },
    ],
  },
];
