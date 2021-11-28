import { TestBed } from '@angular/core/testing';

import { ImpsReportCategoryEditService } from './imps-report-category-edit.service';

describe('ImpsReportCategoryEditService', () => {
  let service: ImpsReportCategoryEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsReportCategoryEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
