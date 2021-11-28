import { TestBed } from '@angular/core/testing';

import { SurveyAnnouncementQuestionEditService } from './survey-announcement-question-edit.service';

describe('SurveyAnnouncementQuestionEditService', () => {
  let service: SurveyAnnouncementQuestionEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyAnnouncementQuestionEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
