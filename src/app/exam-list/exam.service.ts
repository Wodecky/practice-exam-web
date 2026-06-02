import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Exam } from './exam-list.data';
import { ExamResponse, mapExamResponse } from './exam.api';

@Injectable({ providedIn: 'root' })
export class ExamService {
  private readonly http = inject(HttpClient);

  getExams(): Observable<Exam[]> {
    return this.http
      .get<ExamResponse[]>(`${environment.apiBaseUrl}/api/Exams`)
      .pipe(map((responses) => responses.map(mapExamResponse)));
  }
}
