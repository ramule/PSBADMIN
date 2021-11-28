import { TestBed } from '@angular/core/testing';

import { InsuranceCategoryAddService } from './insurance-category-add.service';

describe('InsuranceCategoryAddService', () => {
  let service: InsuranceCategoryAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceCategoryAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
