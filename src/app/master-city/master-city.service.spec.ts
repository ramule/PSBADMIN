import { TestBed } from '@angular/core/testing';

import { MasterCityService } from './master-city.service';

describe('MasterCityService', () => {
  let service: MasterCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
