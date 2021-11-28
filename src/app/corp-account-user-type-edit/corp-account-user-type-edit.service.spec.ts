import { TestBed } from '@angular/core/testing';

import { CorpAccountUserTypeEditService } from './corp-account-user-type-edit.service';

describe('CorpAccountUserTypeEditService', () => {
  let service: CorpAccountUserTypeEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpAccountUserTypeEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
