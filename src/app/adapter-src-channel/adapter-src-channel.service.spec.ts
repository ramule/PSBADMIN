import { TestBed } from '@angular/core/testing';

import { AdapterSrcChannelService } from './adapter-src-channel.service';

describe('AdapterSrcChannelService', () => {
  let service: AdapterSrcChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdapterSrcChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
