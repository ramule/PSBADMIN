import { TestBed } from '@angular/core/testing';

import { ActivitySettingEditService } from './activity-setting-edit.service';

describe('ActivitySettingEditService', () => {
  let service: ActivitySettingEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitySettingEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
