import { TestBed } from '@angular/core/testing';

import { HolidayListAddService } from './holiday-list-add.service';

describe('HolidayListAddService', () => {
  let service: HolidayListAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HolidayListAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
