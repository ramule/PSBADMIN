import { TestBed } from '@angular/core/testing';

import { CorporateDonationEditService } from './corporate-donation-edit.service';

describe('CorporateDonationEditService', () => {
  let service: CorporateDonationEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateDonationEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
