import { TestBed } from '@angular/core/testing';

import { MasterCountryAddService } from './master-country-add.service';

describe('MasterCountryAddService', () => {
  let service: MasterCountryAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCountryAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
