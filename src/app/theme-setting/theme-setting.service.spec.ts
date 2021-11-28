import { TestBed } from '@angular/core/testing';

import { ThemeSettingService } from './theme-setting.service';

describe('ThemeSettingService', () => {
  let service: ThemeSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
