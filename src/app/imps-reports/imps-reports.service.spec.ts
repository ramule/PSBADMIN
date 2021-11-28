import { TestBed } from '@angular/core/testing';

import { ImpsReportsService } from './imps-reports.service';

describe('ImpsReportsService', () => {
  let service: ImpsReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
