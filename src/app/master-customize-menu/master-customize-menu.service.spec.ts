import { TestBed } from '@angular/core/testing';

import { MasterCustomizeMenuService } from './master-customize-menu.service';

describe('MasterCustomizeMenuService', () => {
  let service: MasterCustomizeMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCustomizeMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
