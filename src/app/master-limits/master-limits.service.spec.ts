import { TestBed } from '@angular/core/testing';

import { MasterLimitsService } from './master-limits.service';

describe('MasterLimitsService', () => {
  let service: MasterLimitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterLimitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
