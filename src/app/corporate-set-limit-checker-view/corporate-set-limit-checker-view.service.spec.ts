import { TestBed } from '@angular/core/testing';

import { CorporateSetLimitCheckerViewService } from './corporate-set-limit-checker-view.service';

describe('CorporateSetLimitCheckerViewService', () => {
  let service: CorporateSetLimitCheckerViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateSetLimitCheckerViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
