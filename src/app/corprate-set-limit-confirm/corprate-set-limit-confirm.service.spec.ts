import { TestBed } from '@angular/core/testing';

import { CorprateSetLimitConfirmService } from './corprate-set-limit-confirm.service';

describe('CorprateSetLimitConfirmService', () => {
  let service: CorprateSetLimitConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorprateSetLimitConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
