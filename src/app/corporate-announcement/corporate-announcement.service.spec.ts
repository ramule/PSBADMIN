import { TestBed } from '@angular/core/testing';

import { CorporateAnnouncementService } from './corporate-announcement.service';

describe('CorporateAnnouncementService', () => {
  let service: CorporateAnnouncementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateAnnouncementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
