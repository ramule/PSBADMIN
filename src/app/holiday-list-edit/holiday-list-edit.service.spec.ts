import { TestBed } from '@angular/core/testing';

import { HolidayListEditService } from './holiday-list-edit.service';

describe('HolidayListEditService', () => {
  let service: HolidayListEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HolidayListEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
