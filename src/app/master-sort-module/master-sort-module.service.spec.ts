import { TestBed } from '@angular/core/testing';

import { MasterSortModuleService } from './master-sort-module.service';

describe('MasterSortModuleService', () => {
  let service: MasterSortModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterSortModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
