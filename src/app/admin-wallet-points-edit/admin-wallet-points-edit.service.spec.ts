import { TestBed } from '@angular/core/testing';

import { AdminWalletPointsEditService } from './admin-wallet-points-edit.service';

describe('AdminWalletPointsEditService', () => {
  let service: AdminWalletPointsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminWalletPointsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
