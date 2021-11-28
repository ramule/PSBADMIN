import { TestBed } from '@angular/core/testing';

import { InvestmentProductEditService } from './investment-product-edit.service';

describe('InvestmentProductEditService', () => {
  let service: InvestmentProductEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentProductEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
