import { TestBed } from '@angular/core/testing';

import { CorporateMenuAddService } from './corporate-menu-add.service';

describe('CorporateMenuAddService', () => {
  let service: CorporateMenuAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateMenuAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
