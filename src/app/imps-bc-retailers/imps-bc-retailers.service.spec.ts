import { TestBed } from '@angular/core/testing';

import { ImpsBcRetailersService } from './imps-bc-retailers.service';

describe('ImpsBcRetailersService', () => {
  let service: ImpsBcRetailersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsBcRetailersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
