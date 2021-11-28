import { TestBed } from '@angular/core/testing';

import { ImpsIfscCodesAddService } from './imps-ifsc-codes-add.service';

describe('ImpsIfscCodesAddService', () => {
  let service: ImpsIfscCodesAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsIfscCodesAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
