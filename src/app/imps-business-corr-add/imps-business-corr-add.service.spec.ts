import { TestBed } from '@angular/core/testing';

import { ImpsBusinessCorrAddService } from './imps-business-corr-add.service';

describe('ImpsBusinessCorrAddService', () => {
  let service: ImpsBusinessCorrAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsBusinessCorrAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
