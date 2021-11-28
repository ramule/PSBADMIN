import { TestBed } from '@angular/core/testing';

import { MasterMenuEditService } from './master-menu-edit.service';

describe('MasterMenuEditService', () => {
  let service: MasterMenuEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterMenuEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
