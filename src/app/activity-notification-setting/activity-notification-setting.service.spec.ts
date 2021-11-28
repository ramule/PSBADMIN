import { TestBed } from '@angular/core/testing';

import { ActivityNotificationSettingService } from './activity-notification-setting.service';

describe('ActivityNotificationSettingService', () => {
  let service: ActivityNotificationSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityNotificationSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
