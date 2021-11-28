import { TestBed } from '@angular/core/testing';

import { AccountLeadsService } from './account-leads.service';

describe('AccountLeadsService', () => {
  let service: AccountLeadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountLeadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
