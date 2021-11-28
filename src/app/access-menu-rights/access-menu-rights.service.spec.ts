import { TestBed } from '@angular/core/testing';

import { AccessMenuRightsService } from './access-menu-rights.service';

describe('AccessMenuRightsService', () => {
  let service: AccessMenuRightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessMenuRightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
