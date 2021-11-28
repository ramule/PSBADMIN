import { TestBed } from '@angular/core/testing';

import { CorporateAnnouncementEditService } from './corporate-announcement-edit.service';

describe('CorporateAnnouncementEditService', () => {
  let service: CorporateAnnouncementEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateAnnouncementEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
