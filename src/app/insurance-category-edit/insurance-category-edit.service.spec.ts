import { TestBed } from '@angular/core/testing';

import { InsuranceCategoryEditService } from './insurance-category-edit.service';

describe('InsuranceCategoryEditService', () => {
  let service: InsuranceCategoryEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceCategoryEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
