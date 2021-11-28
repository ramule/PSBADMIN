import { TestBed } from '@angular/core/testing';

import { CorpUserTypeService } from './corp-user-type.service';

describe('CorpUserTypeService', () => {
  let service: CorpUserTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpUserTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
