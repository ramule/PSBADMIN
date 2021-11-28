import { TestBed } from '@angular/core/testing';

import { CorporateOffersAddService } from './corporate-offers-add.service';

describe('CorporateOffersAddService', () => {
  let service: CorporateOffersAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateOffersAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
