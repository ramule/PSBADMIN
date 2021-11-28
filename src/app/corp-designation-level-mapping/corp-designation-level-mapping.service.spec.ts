import { TestBed } from '@angular/core/testing';

import { CorpDesignationLevelMappingService } from './corp-designation-level-mapping.service';

describe('CorpDesignationLevelMappingService', () => {
  let service: CorpDesignationLevelMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpDesignationLevelMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
