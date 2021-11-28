import { TestBed } from '@angular/core/testing';

import { MasterCustomizeSubmenuService } from './master-customize-submenu.service';

describe('MasterCustomizeSubmenuService', () => {
  let service: MasterCustomizeSubmenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCustomizeSubmenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
