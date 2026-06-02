import { Difficulty, Exam, ExamColor } from './exam-list.data';

export interface ExamResponse {
  id: string;
  title: string;
  description: string | null;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
  questionCount: number;
  difficulty: number;
  durationMinutes: number;
  studentCount: number;
  rating: number;
  isPopular: boolean;
  isNew: boolean;
}

const DIFFICULTY_MAP: Readonly<Record<number, Difficulty>> = {
  1: 'Łatwe',
  2: 'Średnie',
  3: 'Trudne',
};

const VALID_COLORS: readonly ExamColor[] = ['primary', 'tertiary', 'secondary'];

function mapDifficulty(value: number): Difficulty {
  return DIFFICULTY_MAP[value] ?? 'Średnie';
}

function mapColor(value: string): ExamColor {
  return (VALID_COLORS as readonly string[]).includes(value) ? (value as ExamColor) : 'primary';
}

export function mapExamResponse(r: ExamResponse): Exam {
  return {
    id: r.id,
    name: r.title,
    desc: r.description ?? '',
    category: r.categoryName,
    color: mapColor(r.categoryColor),
    icon: r.categoryIcon,
    q: r.questionCount,
    diff: mapDifficulty(r.difficulty),
    mins: r.durationMinutes,
    students: r.studentCount,
    rating: r.rating,
    popular: r.isPopular,
    isNew: r.isNew,
  };
}
