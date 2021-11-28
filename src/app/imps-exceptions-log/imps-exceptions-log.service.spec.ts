import { TestBed } from '@angular/core/testing';

import { ImpsExceptionsLogService } from './imps-exceptions-log.service';

describe('ImpsExceptionsLogService', () => {
  let service: ImpsExceptionsLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsExceptionsLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
