import { TestBed } from '@angular/core/testing';

import { BulkNotificationSendService } from './bulk-notification-send.service';

describe('BulkNotificationSendService', () => {
  let service: BulkNotificationSendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkNotificationSendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
