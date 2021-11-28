import { TestBed } from '@angular/core/testing';

import { MessageCodeMasterAddService } from './message-code-master-add.service';

describe('MessageCodeMasterAddService', () => {
  let service: MessageCodeMasterAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageCodeMasterAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
