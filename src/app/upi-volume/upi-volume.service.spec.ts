import { TestBed } from '@angular/core/testing';

import { UpiVolumeService } from './upi-volume.service';

describe('UpiVolumeService', () => {
  let service: UpiVolumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpiVolumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
