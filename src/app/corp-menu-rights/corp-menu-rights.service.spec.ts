import { TestBed } from '@angular/core/testing';

import { CorpMenuRightsService } from './corp-menu-rights.service';

describe('CorpMenuRightsService', () => {
  let service: CorpMenuRightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpMenuRightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
