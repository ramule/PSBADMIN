import { TestBed } from '@angular/core/testing';

import { ImpsBusinessCorrService } from './imps-business-corr.service';

describe('ImpsBusinessCorrService', () => {
  let service: ImpsBusinessCorrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsBusinessCorrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
