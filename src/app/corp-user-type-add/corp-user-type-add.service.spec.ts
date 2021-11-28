import { TestBed } from '@angular/core/testing';

import { CorpUserTypeAddService } from './corp-user-type-add.service';

describe('CorpUserTypeAddService', () => {
  let service: CorpUserTypeAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpUserTypeAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
