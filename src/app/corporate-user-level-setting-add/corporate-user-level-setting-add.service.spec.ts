import { TestBed } from '@angular/core/testing';

import { CorporateUserLevelSettingAddService } from './corporate-user-level-setting-add.service';

describe('CorporateUserLevelSettingAddService', () => {
  let service: CorporateUserLevelSettingAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateUserLevelSettingAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
