import { TestBed } from '@angular/core/testing';

import { CorporateOffersEditService } from './corporate-offers-edit.service';

describe('CorporateOffersEditService', () => {
  let service: CorporateOffersEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateOffersEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
