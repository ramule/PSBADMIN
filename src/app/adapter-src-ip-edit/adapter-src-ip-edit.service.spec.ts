import { TestBed } from '@angular/core/testing';

import { AdapterSrcIpEditService } from './adapter-src-ip-edit.service';

describe('AdapterSrcIpEditService', () => {
  let service: AdapterSrcIpEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdapterSrcIpEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
