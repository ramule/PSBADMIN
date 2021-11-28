import { TestBed } from '@angular/core/testing';

import { ImpsSystemStatusService } from './imps-system-status.service';

describe('ImpsSystemStatusService', () => {
  let service: ImpsSystemStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsSystemStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
