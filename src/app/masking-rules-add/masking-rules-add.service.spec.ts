import { TestBed } from '@angular/core/testing';

import { MaskingRulesAddService } from './masking-rules-add.service';

describe('MaskingRulesAddService', () => {
  let service: MaskingRulesAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaskingRulesAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
