import { TestBed } from '@angular/core/testing';

import { ImpsUsersService } from './imps-users.service';

describe('ImpsUsersService', () => {
  let service: ImpsUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
