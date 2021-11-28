import { TestBed } from '@angular/core/testing';

import { CorpCompanyReqMenuMappingService } from './corp-company-req-menu-mapping.service';

describe('CorpCompanyReqMenuMappingService', () => {
  let service: CorpCompanyReqMenuMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpCompanyReqMenuMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
