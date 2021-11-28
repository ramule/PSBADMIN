import { TestBed } from '@angular/core/testing';

import { AccountTypeEditService } from './account-type-edit.service';

describe('AccountTypeEditService', () => {
  let service: AccountTypeEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountTypeEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
