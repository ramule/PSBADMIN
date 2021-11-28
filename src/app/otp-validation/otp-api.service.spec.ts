import { TestBed, inject } from '@angular/core/testing';

import { OtpAPIService } from './otp-api.service';

describe('OtpAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtpAPIService]
    });
  });

  it('should be created', inject([OtpAPIService], (service: OtpAPIService) => {
    expect(service).toBeTruthy();
  }));
});
