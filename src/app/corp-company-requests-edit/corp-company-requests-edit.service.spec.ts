import { TestBed } from '@angular/core/testing';

import { CorpCompanyRequestsEditService } from './corp-company-requests-edit.service';

describe('CorpCompanyRequestsEditService', () => {
  let service: CorpCompanyRequestsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpCompanyRequestsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
