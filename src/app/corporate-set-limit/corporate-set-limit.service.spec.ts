import { TestBed } from '@angular/core/testing';

import { CorporateSetLimitService } from './corporate-set-limit.service';

describe('CorporateSetLimitService', () => {
  let service: CorporateSetLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateSetLimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
