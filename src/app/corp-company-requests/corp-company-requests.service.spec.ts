import { TestBed } from '@angular/core/testing';

import { CorpCompanyRequestsService } from './corp-company-requests.service';

describe('CorpCompanyRequestsService', () => {
  let service: CorpCompanyRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpCompanyRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
