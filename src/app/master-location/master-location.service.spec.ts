import { TestBed } from '@angular/core/testing';

import { MasterLocationService } from './master-location.service';

describe('MasterLocationService', () => {
  let service: MasterLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
