import { TestBed } from '@angular/core/testing';

import { SurveyAddQuestionEditService } from './survey-add-question-edit.service';

describe('SurveyAddQuestionEditService', () => {
  let service: SurveyAddQuestionEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyAddQuestionEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
