import { TestBed } from '@angular/core/testing';

import { AdminWalletPointAddService } from './admin-wallet-point-add.service';

describe('AdminWalletPointAddService', () => {
  let service: AdminWalletPointAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminWalletPointAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
