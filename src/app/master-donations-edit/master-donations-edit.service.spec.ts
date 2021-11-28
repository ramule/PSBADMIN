import { TestBed } from '@angular/core/testing';

import { MasterDonationsEditService } from './master-donations-edit.service';

describe('MasterDonationsEditService', () => {
  let service: MasterDonationsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterDonationsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
