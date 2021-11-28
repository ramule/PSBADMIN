import { TestBed } from '@angular/core/testing';

import { MasterFacilityService } from './master-facility.service';

describe('MasterFacilityService', () => {
  let service: MasterFacilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterFacilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
