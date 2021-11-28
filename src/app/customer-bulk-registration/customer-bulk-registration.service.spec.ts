import { TestBed } from '@angular/core/testing';

import { CustomerBulkRegistrationService } from './customer-bulk-registration.service';

describe('CustomerBulkRegistrationService', () => {
  let service: CustomerBulkRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerBulkRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
