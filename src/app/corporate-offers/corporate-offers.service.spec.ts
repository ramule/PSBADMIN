import { TestBed } from '@angular/core/testing';

import { CorporateOffersService } from './corporate-offers.service';

describe('CorporateOffersService', () => {
  let service: CorporateOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
