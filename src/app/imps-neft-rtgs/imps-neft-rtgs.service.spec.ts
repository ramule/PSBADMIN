import { TestBed } from '@angular/core/testing';

import { ImpsNeftRtgsService } from './imps-neft-rtgs.service';

describe('ImpsNeftRtgsService', () => {
  let service: ImpsNeftRtgsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsNeftRtgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
