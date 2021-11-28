import { TestBed } from '@angular/core/testing';

import { MasterCalculatorEditService } from './master-calculator-edit.service';

describe('MasterCalculatorEditService', () => {
  let service: MasterCalculatorEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCalculatorEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
