import { TestBed } from '@angular/core/testing';

import { CorpDesignationLevelMappingEditService } from './corp-designation-level-mapping-edit.service';

describe('CorpDesignationLevelMappingEditService', () => {
  let service: CorpDesignationLevelMappingEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpDesignationLevelMappingEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
