import { TestBed } from '@angular/core/testing';

import { AdapterSrcIpService } from './adapter-src-ip.service';

describe('AdapterSrcIpService', () => {
  let service: AdapterSrcIpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdapterSrcIpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
