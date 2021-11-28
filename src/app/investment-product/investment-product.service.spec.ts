import { TestBed } from '@angular/core/testing';

import { InvestmentProductService } from './investment-product.service';

describe('InvestmentProductService', () => {
  let service: InvestmentProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
