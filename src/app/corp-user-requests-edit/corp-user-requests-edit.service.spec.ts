import { TestBed } from '@angular/core/testing';

import { CorpUserRequestsEditService } from './corp-user-requests-edit.service';

describe('CorpUserRequestsEditService', () => {
  let service: CorpUserRequestsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpUserRequestsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
