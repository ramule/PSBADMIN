import { TestBed } from '@angular/core/testing';

import { CorpDesignationLevelMappingAddService } from './corp-designation-level-mapping-add.service';

describe('CorpDesignationLevelMappingAddService', () => {
  let service: CorpDesignationLevelMappingAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpDesignationLevelMappingAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
