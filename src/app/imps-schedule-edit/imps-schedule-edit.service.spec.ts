import { TestBed } from '@angular/core/testing';

import { ImpsScheduleEditService } from './imps-schedule-edit.service';

describe('ImpsScheduleEditService', () => {
  let service: ImpsScheduleEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsScheduleEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
