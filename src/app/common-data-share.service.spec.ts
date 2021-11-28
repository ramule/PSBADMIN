import { TestBed } from '@angular/core/testing';

import { CommonDataShareService } from './common-data-share.service';

describe('CommonDataShareService', () => {
  let service: CommonDataShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonDataShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
