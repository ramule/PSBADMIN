import { TestBed } from '@angular/core/testing';

import { CorporateMenuEditService } from './corporate-menu-edit.service';

describe('CorporateMenuEditService', () => {
  let service: CorporateMenuEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateMenuEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
