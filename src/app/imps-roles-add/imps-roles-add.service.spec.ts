import { TestBed } from '@angular/core/testing';

import { ImpsRolesAddService } from './imps-roles-add.service';

describe('ImpsRolesAddService', () => {
  let service: ImpsRolesAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsRolesAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
