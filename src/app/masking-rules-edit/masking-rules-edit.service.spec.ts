import { TestBed } from '@angular/core/testing';

import { MaskingRulesEditService } from './masking-rules-edit.service';

describe('MaskingRulesEditService', () => {
  let service: MaskingRulesEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaskingRulesEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
