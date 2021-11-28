import { TestBed } from '@angular/core/testing';

import { CorporateUserLevelSettingService } from './corporate-user-level-setting.service';

describe('CorporateUserLevelSettingService', () => {
  let service: CorporateUserLevelSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateUserLevelSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
