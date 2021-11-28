import { TestBed } from '@angular/core/testing';

import { HolidayListBulkAddService } from './holiday-list-bulk-add.service';

describe('HolidayListBulkAddService', () => {
  let service: HolidayListBulkAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HolidayListBulkAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
