import { TestBed } from '@angular/core/testing';

import { TransactionsLogsService } from './transactions-logs.service';

describe('TransactionsLogsService', () => {
  let service: TransactionsLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionsLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
