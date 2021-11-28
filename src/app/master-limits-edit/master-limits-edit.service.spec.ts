import { TestBed } from '@angular/core/testing';

import { MasterLimitsEditService } from './master-limits-edit.service';

describe('MasterLimitsEditService', () => {
  let service: MasterLimitsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterLimitsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
