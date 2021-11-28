import { TestBed } from '@angular/core/testing';

import { MasterStateAddService } from './master-state-add.service';

describe('MasterStateAddService', () => {
  let service: MasterStateAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterStateAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
