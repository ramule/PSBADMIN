import { TestBed } from '@angular/core/testing';

import { ImpsScheduleAddService } from './imps-schedule-add.service';

describe('ImpsScheduleAddService', () => {
  let service: ImpsScheduleAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsScheduleAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
