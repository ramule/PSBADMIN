import { TestBed } from '@angular/core/testing';

import { DynamicReportsGridService } from './dynamic-reports-grid.service';

describe('DynamicReportsGridService', () => {
  let service: DynamicReportsGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicReportsGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
