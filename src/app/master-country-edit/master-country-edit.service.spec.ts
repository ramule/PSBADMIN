import { TestBed } from '@angular/core/testing';

import { MasterCountryEditService } from './master-country-edit.service';

describe('MasterCountryEditService', () => {
  let service: MasterCountryEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCountryEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
