import { TestBed } from '@angular/core/testing';

import { CorporateSetLimitViewService } from './corporate-set-limit-view.service';

describe('CorporateSetLimitViewService', () => {
  let service: CorporateSetLimitViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateSetLimitViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
