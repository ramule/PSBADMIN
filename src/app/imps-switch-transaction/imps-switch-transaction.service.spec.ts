import { TestBed } from '@angular/core/testing';

import { ImpsSwitchTransactionService } from './imps-switch-transaction.service';

describe('ImpsSwitchTransactionService', () => {
  let service: ImpsSwitchTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsSwitchTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
