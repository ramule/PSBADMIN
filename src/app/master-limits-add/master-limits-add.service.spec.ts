import { TestBed } from '@angular/core/testing';

import { MasterLimitsAddService } from './master-limits-add.service';

describe('MasterLimitsAddService', () => {
  let service: MasterLimitsAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterLimitsAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
