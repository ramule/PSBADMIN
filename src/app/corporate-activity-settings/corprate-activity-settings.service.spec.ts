import { TestBed } from '@angular/core/testing';

import { CorprateActivitySettingsService } from './corprate-activity-settings.service';

describe('CorprateActivitySettingsService', () => {
  let service: CorprateActivitySettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorprateActivitySettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
