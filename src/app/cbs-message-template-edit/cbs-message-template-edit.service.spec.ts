import { TestBed } from '@angular/core/testing';

import { CbsMessageTemplateEditService } from './cbs-message-template-edit.service';

describe('CbsMessageTemplateEditService', () => {
  let service: CbsMessageTemplateEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbsMessageTemplateEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
