import { TestBed } from '@angular/core/testing';

import { RmMasterEditService } from './rm-master-edit.service';

describe('RmMasterEditService', () => {
  let service: RmMasterEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RmMasterEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
