import { TestBed } from '@angular/core/testing';

import { ActivityNotificationSettingEditService } from './activity-notification-setting-edit.service';

describe('ActivityNotificationSettingEditService', () => {
  let service: ActivityNotificationSettingEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityNotificationSettingEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
