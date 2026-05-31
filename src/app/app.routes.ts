import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing/landing.component').then((m) => m.LandingComponent),
  },
  {
    path: 'exams',
    title: 'Egzaminy — Pracsis',
    loadComponent: () => import('./exam-list/exam-list.component').then((m) => m.ExamListComponent),
  },
  {
    path: 'exam',
    title: 'Egzamin · Matura — Matematyka — Pracsis',
    loadComponent: () => import('./exam/exam.component').then((m) => m.ExamComponent),
  },
  { path: '**', redirectTo: '' },
];
