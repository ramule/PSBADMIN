import { TestBed } from '@angular/core/testing';

import { CorporateSetLimitEditService } from './corporate-set-limit-edit.service';

describe('CorporateSetLimitEditService', () => {
  let service: CorporateSetLimitEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateSetLimitEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
