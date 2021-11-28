import { TestBed } from '@angular/core/testing';

import { CorpAccountUserTypeAddService } from './corp-account-user-type-add.service';

describe('CorpAccountUserTypeAddService', () => {
  let service: CorpAccountUserTypeAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpAccountUserTypeAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
