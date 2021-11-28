import { TestBed } from '@angular/core/testing';

import { CorporateAnnouncementAddService } from './corporate-announcement-add.service';

describe('CorporateAnnouncementAddService', () => {
  let service: CorporateAnnouncementAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateAnnouncementAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
