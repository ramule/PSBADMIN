import { TestBed } from '@angular/core/testing';

import { CbsMessageTemplateService } from './cbs-message-template.service';

describe('CbsMessageTemplateService', () => {
  let service: CbsMessageTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbsMessageTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
