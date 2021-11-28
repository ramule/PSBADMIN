import { TestBed } from '@angular/core/testing';

import { ImpsNeftRtgsAddService } from './imps-neft-rtgs-add.service';

describe('ImpsNeftRtgsAddService', () => {
  let service: ImpsNeftRtgsAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsNeftRtgsAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
