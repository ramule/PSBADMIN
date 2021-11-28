import { TestBed } from '@angular/core/testing';

import { MasterCustomizeMenuAddService } from './master-customize-menu-add.service';

describe('MasterCustomizeMenuAddService', () => {
  let service: MasterCustomizeMenuAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCustomizeMenuAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
