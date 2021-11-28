import { TestBed } from '@angular/core/testing';

import { CorporateUserAddService } from './corporate-user-add.service';

describe('CorporateUserAddService', () => {
  let service: CorporateUserAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateUserAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
