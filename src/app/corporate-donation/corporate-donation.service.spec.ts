import { TestBed } from '@angular/core/testing';

import { CorporateDonationService } from './corporate-donation.service';

describe('CorporateDonationService', () => {
  let service: CorporateDonationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateDonationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
