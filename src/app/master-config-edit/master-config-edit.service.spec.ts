import { TestBed } from '@angular/core/testing';

import { MasterConfigEditService } from './master-config-edit.service';

describe('MasterConfigEditService', () => {
  let service: MasterConfigEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterConfigEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
