import { TestBed } from '@angular/core/testing';

import { CorpUserRequestsService } from './corp-user-requests.service';

describe('CorpUserRequestsService', () => {
  let service: CorpUserRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpUserRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
