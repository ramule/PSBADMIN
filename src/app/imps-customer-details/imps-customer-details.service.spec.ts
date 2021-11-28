import { TestBed } from '@angular/core/testing';

import { ImpsCustomerDetailsService } from './imps-customer-details.service';

describe('ImpsCustomerDetailsService', () => {
  let service: ImpsCustomerDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsCustomerDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
