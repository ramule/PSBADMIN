import { TestBed } from '@angular/core/testing';

import { MessageCodeMasterService } from './message-code-master.service';

describe('MessageCodeMasterService', () => {
  let service: MessageCodeMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageCodeMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
