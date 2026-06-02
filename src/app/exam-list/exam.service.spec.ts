import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { Exam } from './exam-list.data';
import { ExamResponse } from './exam.api';
import { ExamService } from './exam.service';

const MOCK_RESPONSE: ExamResponse = {
  id: 'abc-123',
  title: 'Test Exam',
  description: 'A test description',
  categoryName: 'Technologia',
  categoryColor: 'primary',
  categoryIcon: 'code',
  questionCount: 100,
  difficulty: 2,
  durationMinutes: 60,
  studentCount: 1000,
  rating: 4.5,
  isPopular: true,
  isNew: false,
};

const EXPECTED_EXAM: Exam = {
  id: 'abc-123',
  name: 'Test Exam',
  desc: 'A test description',
  category: 'Technologia',
  color: 'primary',
  icon: 'code',
  q: 100,
  diff: 'Średnie',
  mins: 60,
  students: 1000,
  rating: 4.5,
  popular: true,
  isNew: false,
};

describe('ExamService', () => {
  let service: ExamService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ExamService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and map exams from GET /api/Exams', () => {
    let result: Exam[] | undefined;
    service.getExams().subscribe((exams) => (result = exams));

    const req = httpMock.expectOne('/api/Exams');
    expect(req.request.method).toBe('GET');
    req.flush([MOCK_RESPONSE]);

    expect(result).toEqual([EXPECTED_EXAM]);
  });

  it('should map difficulty int 1 to Łatwe', () => {
    let result: Exam[] | undefined;
    service.getExams().subscribe((exams) => (result = exams));

    httpMock.expectOne('/api/Exams').flush([{ ...MOCK_RESPONSE, difficulty: 1 }]);
    expect(result![0].diff).toBe('Łatwe');
  });

  it('should map difficulty int 3 to Trudne', () => {
    let result: Exam[] | undefined;
    service.getExams().subscribe((exams) => (result = exams));

    httpMock.expectOne('/api/Exams').flush([{ ...MOCK_RESPONSE, difficulty: 3 }]);
    expect(result![0].diff).toBe('Trudne');
  });

  it('should default unknown difficulty to Średnie', () => {
    let result: Exam[] | undefined;
    service.getExams().subscribe((exams) => (result = exams));

    httpMock.expectOne('/api/Exams').flush([{ ...MOCK_RESPONSE, difficulty: 99 }]);
    expect(result![0].diff).toBe('Średnie');
  });

  it('should default unknown categoryColor to primary', () => {
    let result: Exam[] | undefined;
    service.getExams().subscribe((exams) => (result = exams));

    httpMock.expectOne('/api/Exams').flush([{ ...MOCK_RESPONSE, categoryColor: 'unknown-color' }]);
    expect(result![0].color).toBe('primary');
  });

  it('should map null description to empty string', () => {
    let result: Exam[] | undefined;
    service.getExams().subscribe((exams) => (result = exams));

    httpMock.expectOne('/api/Exams').flush([{ ...MOCK_RESPONSE, description: null }]);
    expect(result![0].desc).toBe('');
  });
});
