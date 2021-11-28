import { TestBed } from '@angular/core/testing';

import { FreezeUnfreezeAccountService } from './freeze-unfreeze-account.service';

describe('FreezeUnfreezeAccountService', () => {
  let service: FreezeUnfreezeAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreezeUnfreezeAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
