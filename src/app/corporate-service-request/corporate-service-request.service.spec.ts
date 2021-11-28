import { TestBed } from '@angular/core/testing';

import { CorporateServiceRequestService } from './corporate-service-request.service';

describe('CorporateServiceRequestService', () => {
  let service: CorporateServiceRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateServiceRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
