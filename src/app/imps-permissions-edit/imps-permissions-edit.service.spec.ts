import { TestBed } from '@angular/core/testing';

import { ImpsPermissionsEditService } from './imps-permissions-edit.service';

describe('ImpsPermissionsEditService', () => {
  let service: ImpsPermissionsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsPermissionsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
