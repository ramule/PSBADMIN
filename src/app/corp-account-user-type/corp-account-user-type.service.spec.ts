import { TestBed } from '@angular/core/testing';

import { CorpAccountUserTypeService } from './corp-account-user-type.service';

describe('CorpAccountUserTypeService', () => {
  let service: CorpAccountUserTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpAccountUserTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
