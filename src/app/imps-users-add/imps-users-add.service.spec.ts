import { TestBed } from '@angular/core/testing';

import { ImpsUsersAddService } from './imps-users-add.service';

describe('ImpsUsersAddService', () => {
  let service: ImpsUsersAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsUsersAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
