import { TestBed } from '@angular/core/testing';

import { ImpsRolesService } from './imps-roles.service';

describe('ImpsRolesService', () => {
  let service: ImpsRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
