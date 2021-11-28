import { TestBed } from '@angular/core/testing';

import { InsuranceCompanyEditService } from './insurance-company-edit.service';

describe('InsuranceCompanyEditService', () => {
  let service: InsuranceCompanyEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceCompanyEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
