import { TestBed } from '@angular/core/testing';

import { MessageCodeMasterEditService } from './message-code-master-edit.service';

describe('MessageCodeMasterEditService', () => {
  let service: MessageCodeMasterEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageCodeMasterEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
