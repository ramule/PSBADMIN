import { TestBed } from '@angular/core/testing';

import { ImpsConnectionStatusService } from './imps-connection-status.service';

describe('ImpsConnectionStatusService', () => {
  let service: ImpsConnectionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsConnectionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
