import { TestBed } from '@angular/core/testing';

import { MasterCountryService } from './master-country.service';

describe('MasterCountryService', () => {
  let service: MasterCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
