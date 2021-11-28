import { TestBed } from '@angular/core/testing';

import { InsuranceCategoryService } from './insurance-category.service';

describe('InsuranceCategoryService', () => {
  let service: InsuranceCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
