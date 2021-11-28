import { TestBed } from '@angular/core/testing';

import { MasterCustomizeSubmenuEditService } from './master-customize-submenu-edit.service';

describe('MasterCustomizeSubmenuEditService', () => {
  let service: MasterCustomizeSubmenuEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCustomizeSubmenuEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
