import { TestBed } from '@angular/core/testing';

import { ImpsOtpLogDetailsService } from './imps-otp-log-details.service';

describe('ImpsOtpLogDetailsService', () => {
  let service: ImpsOtpLogDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsOtpLogDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
