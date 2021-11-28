import { TestBed } from '@angular/core/testing';

import { DynamicReportsEditService } from './dynamic-reports-edit.service';

describe('DynamicReportsEditService', () => {
  let service: DynamicReportsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicReportsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
