import { TestBed } from '@angular/core/testing';

import { SurveyAnnouncementDetailsService } from './survey-announcement-details.service';

describe('SurveyAnnouncementDetailsService', () => {
  let service: SurveyAnnouncementDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyAnnouncementDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
