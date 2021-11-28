import { TestBed } from '@angular/core/testing';

import { SurveyAnnouncementService } from './survey-announcement.service';

describe('SurveyAnnouncementService', () => {
  let service: SurveyAnnouncementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyAnnouncementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
