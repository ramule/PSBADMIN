import { TestBed } from '@angular/core/testing';

import { DynamicReportsDetailsAddService } from './dynamic-reports-details-add.service';

describe('DynamicReportsDetailsAddService', () => {
  let service: DynamicReportsDetailsAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicReportsDetailsAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
