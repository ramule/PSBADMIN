import { TestBed } from '@angular/core/testing';

import { CorporateSetLimitAddService } from './corporate-set-limit-add.service';

describe('CorporateSetLimitAddService', () => {
  let service: CorporateSetLimitAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateSetLimitAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
