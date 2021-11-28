import { TestBed } from '@angular/core/testing';

import { AccessSubmenuRightsService } from './access-submenu-rights.service';

describe('AccessSubmenuRightsService', () => {
  let service: AccessSubmenuRightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessSubmenuRightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
