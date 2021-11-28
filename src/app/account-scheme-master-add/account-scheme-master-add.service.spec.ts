import { TestBed } from '@angular/core/testing';

import { AccountSchemeMasterAddService } from './account-scheme-master-add.service';

describe('AccountSchemeMasterAddService', () => {
  let service: AccountSchemeMasterAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSchemeMasterAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
