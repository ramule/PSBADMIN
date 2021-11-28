import { TestBed } from '@angular/core/testing';

import { DynamicReportsDetailsService } from './dynamic-reports-details.service';

describe('DynamicReportsDetailsService', () => {
  let service: DynamicReportsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicReportsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
