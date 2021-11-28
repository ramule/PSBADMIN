import { TestBed } from '@angular/core/testing';

import { ScheduledMaintenanceService } from './scheduled-maintenance.service';

describe('ScheduledMaintenanceService', () => {
  let service: ScheduledMaintenanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledMaintenanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
