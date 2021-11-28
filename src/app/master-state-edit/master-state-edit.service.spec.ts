import { TestBed } from '@angular/core/testing';

import { MasterStateEditService } from './master-state-edit.service';

describe('MasterStateEditService', () => {
  let service: MasterStateEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterStateEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
