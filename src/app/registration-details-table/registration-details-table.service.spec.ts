import { TestBed } from '@angular/core/testing';

import { RegistrationDetailsTableService } from './registration-details-table.service';

describe('RegistrationDetailsTableService', () => {
  let service: RegistrationDetailsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationDetailsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
