import { TestBed } from '@angular/core/testing';

import { InvestmentProductAddService } from './investment-product-add.service';

describe('InvestmentProductAddService', () => {
  let service: InvestmentProductAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentProductAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
