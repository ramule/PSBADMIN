import { TestBed } from '@angular/core/testing';

import { ImpsTransLogService } from './imps-trans-log.service';

describe('ImpsTransLogService', () => {
  let service: ImpsTransLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsTransLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
