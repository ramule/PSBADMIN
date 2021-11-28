import { TestBed } from '@angular/core/testing';

import { CalculatorFormulaEditService } from './calculator-formula-edit.service';

describe('CalculatorFormulaEditService', () => {
  let service: CalculatorFormulaEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorFormulaEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
