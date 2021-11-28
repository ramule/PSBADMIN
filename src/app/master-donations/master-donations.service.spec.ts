import { TestBed } from '@angular/core/testing';

import { MasterDonationsService } from './master-donations.service';

describe('MasterDonationsService', () => {
  let service: MasterDonationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterDonationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
