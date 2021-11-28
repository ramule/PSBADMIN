import { TestBed } from '@angular/core/testing';

import { MasterCityAddService } from './master-city-add.service';

describe('MasterCityAddService', () => {
  let service: MasterCityAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCityAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
