import { TestBed } from '@angular/core/testing';

import { AccountSchemeMasterService } from './account-scheme-master.service';

describe('AccountSchemeMasterService', () => {
  let service: AccountSchemeMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSchemeMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
