import { TestBed } from '@angular/core/testing';

import { CorpUserTypeEditService } from './corp-user-type-edit.service';

describe('CorpUserTypeEditService', () => {
  let service: CorpUserTypeEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorpUserTypeEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
