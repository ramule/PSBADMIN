import { TestBed } from '@angular/core/testing';

import { ImpsReportsDetailsService } from './imps-reports-details.service';

describe('ImpsReportsDetailsService', () => {
  let service: ImpsReportsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsReportsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
