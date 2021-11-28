import { TestBed } from '@angular/core/testing';

import { ImpsScheduleService } from './imps-schedule.service';

describe('ImpsScheduleService', () => {
  let service: ImpsScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
