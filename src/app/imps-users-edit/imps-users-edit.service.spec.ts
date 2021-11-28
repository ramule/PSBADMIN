import { TestBed } from '@angular/core/testing';

import { ImpsUsersEditService } from './imps-users-edit.service';

describe('ImpsUsersEditService', () => {
  let service: ImpsUsersEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsUsersEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
