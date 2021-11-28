import { TestBed } from '@angular/core/testing';

import { CorporateUserEditService } from './corporate-user-edit.service';

describe('CorporateUserEditService', () => {
  let service: CorporateUserEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateUserEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
