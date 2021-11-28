import { TestBed } from '@angular/core/testing';

import { MasterCityEditService } from './master-city-edit.service';

describe('MasterCityEditService', () => {
  let service: MasterCityEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCityEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
