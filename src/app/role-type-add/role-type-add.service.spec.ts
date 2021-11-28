import { TestBed } from '@angular/core/testing';

import { RoleTypeAddService } from './role-type-add.service';

describe('RoleTypeAddService', () => {
  let service: RoleTypeAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleTypeAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
