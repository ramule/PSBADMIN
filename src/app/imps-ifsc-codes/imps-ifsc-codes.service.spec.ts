import { TestBed } from '@angular/core/testing';

import { ImpsIfscCodesService } from './imps-ifsc-codes.service';

describe('ImpsIfscCodesService', () => {
  let service: ImpsIfscCodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsIfscCodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
