import { TestBed } from '@angular/core/testing';

import { ImpsIfscCodesEditService } from './imps-ifsc-codes-edit.service';

describe('ImpsIfscCodesEditService', () => {
  let service: ImpsIfscCodesEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsIfscCodesEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
