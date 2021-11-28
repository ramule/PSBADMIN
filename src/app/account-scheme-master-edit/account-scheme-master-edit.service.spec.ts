import { TestBed } from '@angular/core/testing';

import { AccountSchemeMasterEditService } from './account-scheme-master-edit.service';

describe('AccountSchemeMasterEditService', () => {
  let service: AccountSchemeMasterEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSchemeMasterEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
