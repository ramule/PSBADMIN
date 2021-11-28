import { TestBed } from '@angular/core/testing';

import { ImpsRolesEditService } from './imps-roles-edit.service';

describe('ImpsRolesEditService', () => {
  let service: ImpsRolesEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsRolesEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
