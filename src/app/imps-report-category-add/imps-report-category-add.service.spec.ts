import { TestBed } from '@angular/core/testing';

import { ImpsReportCategoryAddService } from './imps-report-category-add.service';

describe('ImpsReportCategoryAddService', () => {
  let service: ImpsReportCategoryAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsReportCategoryAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
