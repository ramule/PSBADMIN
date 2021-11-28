import { TestBed } from '@angular/core/testing';

import { ImpsReportCategoryService } from './imps-report-category.service';

describe('ImpsReportCategoryService', () => {
  let service: ImpsReportCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsReportCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
