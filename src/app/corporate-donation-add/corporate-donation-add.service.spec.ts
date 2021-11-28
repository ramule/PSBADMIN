import { TestBed } from '@angular/core/testing';

import { CorporateDonationAddService } from './corporate-donation-add.service';

describe('CorporateDonationAddService', () => {
  let service: CorporateDonationAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateDonationAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
