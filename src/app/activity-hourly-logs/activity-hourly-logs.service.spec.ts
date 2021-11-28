import { TestBed } from '@angular/core/testing';

import { ActivityHourlyLogsService } from './activity-hourly-logs.service';

describe('ActivityHourlyLogsService', () => {
  let service: ActivityHourlyLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityHourlyLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
