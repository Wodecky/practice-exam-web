export interface Exam {
  name: string;
  icon: string;
  qs: string;
  meta: string;
  color: 'primary' | 'tertiary' | 'secondary';
  popular?: boolean;
}

export interface ExamTab {
  label: string;
  exams: Exam[];
}

export const EXAM_TABS: ExamTab[] = [
  {
    label: 'Akademickie',
    exams: [
      {
        name: 'Matura — Matematyka',
        icon: 'school',
        qs: '4 820 pytań',
        meta: 'Średnia poprawa +18 pkt',
        color: 'primary',
        popular: true,
      },
      {
        name: 'Matura — Język polski',
        icon: 'menu_book',
        qs: '3 140 pytań',
        meta: 'Rozszerzenie + podstawa',
        color: 'tertiary',
      },
      {
        name: 'Egzamin ósmoklasisty',
        icon: 'function',
        qs: '1 980 pytań',
        meta: 'Wszystkie przedmioty',
        color: 'secondary',
      },
      {
        name: 'IELTS Academic',
        icon: 'translate',
        qs: '2 460 pytań',
        meta: 'Cel: poziom 7+',
        color: 'primary',
      },
    ],
  },
  {
    label: 'Technologia',
    exams: [
      {
        name: 'AWS Solutions Architect',
        icon: 'cloud',
        qs: '1 720 pytań',
        meta: 'Zgodne z SAA-C03',
        color: 'primary',
        popular: true,
      },
      {
        name: 'CKAD — Kubernetes',
        icon: 'developer_board',
        qs: '640 pytań',
        meta: 'Ćwiczenia z YAML',
        color: 'tertiary',
      },
      {
        name: 'Frontend — rekrutacja',
        icon: 'code',
        qs: '980 pytań',
        meta: 'JS · React · System',
        color: 'secondary',
      },
      {
        name: 'Google Cloud ACE',
        icon: 'cloud_sync',
        qs: '1 210 pytań',
        meta: 'Plan szkolenia 2025',
        color: 'primary',
      },
    ],
  },
  {
    label: 'Zawodowe',
    exams: [
      {
        name: 'PMP',
        icon: 'workspaces',
        qs: '2 340 pytań',
        meta: 'PMBOK 7 + Agile',
        color: 'primary',
        popular: true,
      },
      {
        name: 'CFA Level I',
        icon: 'finance_mode',
        qs: '3 820 pytań',
        meta: '10 obszarów tematycznych',
        color: 'tertiary',
      },
      {
        name: 'ACCA F1–F3',
        icon: 'gavel',
        qs: '1 640 pytań',
        meta: 'Symulacje zadań',
        color: 'secondary',
      },
      {
        name: 'Six Sigma Green Belt',
        icon: 'analytics',
        qs: '720 pytań',
        meta: 'Cykl DMAIC',
        color: 'primary',
      },
    ],
  },
  {
    label: 'Medyczne',
    exams: [
      {
        name: 'LEK — Lekarski',
        icon: 'stethoscope',
        qs: '5 420 pytań',
        meta: 'Najważniejsze tematy',
        color: 'primary',
        popular: true,
      },
      {
        name: 'PES — Pediatria',
        icon: 'medical_services',
        qs: '3 260 pytań',
        meta: 'Aktualna podstawa',
        color: 'tertiary',
      },
      {
        name: 'LDEK — Stomatologia',
        icon: 'psychology',
        qs: '1 140 pytań',
        meta: 'Pełen zakres',
        color: 'secondary',
      },
      {
        name: 'Pielęgniarstwo PWZ',
        icon: 'monitor_heart',
        qs: '2 080 pytań',
        meta: 'Cały program',
        color: 'primary',
      },
    ],
  },
  {
    label: 'Licencje',
    exams: [
      {
        name: 'Prawo jazdy kat. B',
        icon: 'directions_car',
        qs: '1 240 pytań',
        meta: 'Wszystkie kategorie',
        color: 'primary',
      },
      {
        name: 'Pośrednik nieruchomości',
        icon: 'home_work',
        qs: '920 pytań',
        meta: 'Państwowe + lokalne',
        color: 'tertiary',
        popular: true,
      },
      {
        name: 'Licencja PPL — Pilot',
        icon: 'flight',
        qs: '780 pytań',
        meta: 'Zgodne z EASA',
        color: 'secondary',
      },
      {
        name: 'Egzamin maklerski',
        icon: 'show_chart',
        qs: '1 560 pytań',
        meta: 'Specyfikacja KNF',
        color: 'primary',
      },
    ],
  },
];
