import { TestBed } from '@angular/core/testing';

import { ImpsTransactionDashboardService } from './imps-transaction-dashboard.service';

describe('ImpsTransactionDashboardService', () => {
  let service: ImpsTransactionDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsTransactionDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
