import { TestBed } from '@angular/core/testing';

import { MasterCustomizeMenuEditService } from './master-customize-menu-edit.service';

describe('MasterCustomizeMenuEditService', () => {
  let service: MasterCustomizeMenuEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterCustomizeMenuEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
