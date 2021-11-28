import { TestBed } from '@angular/core/testing';

import { MasterStateService } from './master-state.service';

describe('MasterStateService', () => {
  let service: MasterStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
