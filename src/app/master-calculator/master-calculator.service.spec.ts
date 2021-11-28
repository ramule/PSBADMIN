import { TestBed } from '@angular/core/testing';

import { MasterCalculatorService } from './master-calculator.service';

describe('MasterCalculatorService', () => {
  let service: MasterCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
