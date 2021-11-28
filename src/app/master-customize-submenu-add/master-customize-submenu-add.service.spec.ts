import { TestBed } from '@angular/core/testing';

import { MasterCustomizeSubmenuAddService } from './master-customize-submenu-add.service';

describe('MasterCustomizeSubmenuAddService', () => {
  let service: MasterCustomizeSubmenuAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCustomizeSubmenuAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
