import { TestBed } from '@angular/core/testing';

import { RmMasterService } from './rm-master.service';

describe('RmMasterService', () => {
  let service: RmMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RmMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
