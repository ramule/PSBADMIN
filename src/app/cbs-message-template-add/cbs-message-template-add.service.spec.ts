import { TestBed } from '@angular/core/testing';

import { CbsMessageTemplateAddService } from './cbs-message-template-add.service';

describe('CbsMessageTemplateAddService', () => {
  let service: CbsMessageTemplateAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbsMessageTemplateAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
