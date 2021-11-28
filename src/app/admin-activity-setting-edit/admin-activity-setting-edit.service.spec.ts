import { TestBed } from '@angular/core/testing';

import { AdminActivitySettingEditService } from './admin-activity-setting-edit.service';

describe('AdminActivitySettingEditService', () => {
  let service: AdminActivitySettingEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminActivitySettingEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
