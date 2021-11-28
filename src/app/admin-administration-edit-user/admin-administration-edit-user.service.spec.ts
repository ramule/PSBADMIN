import { TestBed } from '@angular/core/testing';

import { AdminAdministrationEditUserService } from './admin-administration-edit-user.service';

describe('AdminAdministrationEditUserService', () => {
  let service: AdminAdministrationEditUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAdministrationEditUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
