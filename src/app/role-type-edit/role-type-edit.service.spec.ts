import { TestBed } from '@angular/core/testing';

import { RoleTypeEditService } from './role-type-edit.service';

describe('RoleTypeEditService', () => {
  let service: RoleTypeEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleTypeEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
