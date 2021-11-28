import { TestBed } from '@angular/core/testing';

import { MasterFacilityEditService } from './master-facility-edit.service';

describe('MasterFacilityEditService', () => {
  let service: MasterFacilityEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterFacilityEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
