import { TestBed } from '@angular/core/testing';

import { DynamicReportsDetailsEditService } from './dynamic-reports-details-edit.service';

describe('DynamicReportsDetailsEditService', () => {
  let service: DynamicReportsDetailsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicReportsDetailsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
