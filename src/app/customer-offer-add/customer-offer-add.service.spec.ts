import { TestBed } from '@angular/core/testing';

import { CustomerOfferAddService } from './customer-offer-add.service';

describe('CustomerOfferAddService', () => {
  let service: CustomerOfferAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerOfferAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
