import { TestBed } from '@angular/core/testing';

import { CorporateCompanyAddService } from './corporate-company-add.service';

describe('CorporateCompanyAddService', () => {
  let service: CorporateCompanyAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateCompanyAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
