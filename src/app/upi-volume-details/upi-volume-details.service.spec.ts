import { TestBed } from '@angular/core/testing';

import { UpiVolumeDetailsService } from './upi-volume-details.service';

describe('UpiVolumeDetailsService', () => {
  let service: UpiVolumeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpiVolumeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
