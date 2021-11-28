import { TestBed } from '@angular/core/testing';

import { CorporateServiceRequestEditService } from './corporate-service-request-edit.service';

describe('CorporateServiceRequestEditService', () => {
  let service: CorporateServiceRequestEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateServiceRequestEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
