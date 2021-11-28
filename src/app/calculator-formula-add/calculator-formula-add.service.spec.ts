import { TestBed } from '@angular/core/testing';

import { CalculatorFormulaAddService } from './calculator-formula-add.service';

describe('CalculatorFormulaAddService', () => {
  let service: CalculatorFormulaAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorFormulaAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
