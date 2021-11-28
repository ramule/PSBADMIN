import { TestBed } from '@angular/core/testing';

import { CorporateUserLevelSettingEditService } from './corporate-user-level-setting-edit.service';

describe('CorporateUserLevelSettingEditService', () => {
  let service: CorporateUserLevelSettingEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateUserLevelSettingEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
