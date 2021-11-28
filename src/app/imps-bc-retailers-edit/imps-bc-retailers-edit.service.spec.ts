import { TestBed } from '@angular/core/testing';

import { ImpsBcRetailersEditService } from './imps-bc-retailers-edit.service';

describe('ImpsBcRetailersEditService', () => {
  let service: ImpsBcRetailersEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsBcRetailersEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
