import { TestBed } from '@angular/core/testing';

import { CustomerOfferEditService } from './customer-offer-edit.service';

describe('CustomerOfferEditService', () => {
  let service: CustomerOfferEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerOfferEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
