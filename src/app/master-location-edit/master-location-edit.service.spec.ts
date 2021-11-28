import { TestBed } from '@angular/core/testing';

import { MasterLocationEditService } from './master-location-edit.service';

describe('MasterLocationEditService', () => {
  let service: MasterLocationEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterLocationEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
