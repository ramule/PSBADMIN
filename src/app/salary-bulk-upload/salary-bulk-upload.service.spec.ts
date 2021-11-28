import { TestBed } from '@angular/core/testing';

import { SalaryBulkUploadService } from './salary-bulk-upload.service';

describe('SalaryBulkUploadService', () => {
  let service: SalaryBulkUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalaryBulkUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
