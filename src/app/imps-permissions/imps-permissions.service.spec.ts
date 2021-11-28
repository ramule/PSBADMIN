import { TestBed } from '@angular/core/testing';

import { ImpsPermissionsService } from './imps-permissions.service';

describe('ImpsPermissionsService', () => {
  let service: ImpsPermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsPermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
