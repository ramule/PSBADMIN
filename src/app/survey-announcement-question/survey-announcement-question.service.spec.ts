import { TestBed } from '@angular/core/testing';

import { SurveyAnnouncementQuestionService } from './survey-announcement-question.service';

describe('SurveyAnnouncementQuestionService', () => {
  let service: SurveyAnnouncementQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyAnnouncementQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
