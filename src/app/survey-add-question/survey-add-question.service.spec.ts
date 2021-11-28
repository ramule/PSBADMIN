import { TestBed } from '@angular/core/testing';

import { SurveyAddQuestionService } from './survey-add-question.service';

describe('SurveyAddQuestionService', () => {
  let service: SurveyAddQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyAddQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
