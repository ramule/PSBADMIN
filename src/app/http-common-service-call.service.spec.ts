import { TestBed } from '@angular/core/testing';

import { HttpCommonServiceCallService } from './http-common-service-call.service';

describe('HttpCommonServiceCallService', () => {
  let service: HttpCommonServiceCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCommonServiceCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
