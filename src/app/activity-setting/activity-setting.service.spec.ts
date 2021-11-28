import { TestBed } from '@angular/core/testing';

import { ActivitySettingService } from './activity-setting.service';

describe('ActivitySettingService', () => {
  let service: ActivitySettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitySettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
