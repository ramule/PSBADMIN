import { TestBed } from '@angular/core/testing';

import { AdapterSrcChannelEditService } from './adapter-src-channel-edit.service';

describe('AdapterSrcChannelEditService', () => {
  let service: AdapterSrcChannelEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdapterSrcChannelEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
