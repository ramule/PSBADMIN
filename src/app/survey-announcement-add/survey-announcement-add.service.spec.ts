import { TestBed } from '@angular/core/testing';

import { SurveyAnnouncementAddService } from './survey-announcement-add.service';

describe('SurveyAnnouncementAddService', () => {
  let service: SurveyAnnouncementAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyAnnouncementAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
