import { TestBed } from '@angular/core/testing';

import { CalculatorFormulaService } from './calculator-formula.service';

describe('CalculatorFormulaService', () => {
  let service: CalculatorFormulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorFormulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
