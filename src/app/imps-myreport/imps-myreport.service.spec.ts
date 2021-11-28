import { TestBed } from '@angular/core/testing';

import { ImpsMyreportService } from './imps-myreport.service';

describe('ImpsMyreportService', () => {
  let service: ImpsMyreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsMyreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
