import { TestBed } from '@angular/core/testing';

import { ImpsBcRetailersAddService } from './imps-bc-retailers-add.service';

describe('ImpsBcRetailersAddService', () => {
  let service: ImpsBcRetailersAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsBcRetailersAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
