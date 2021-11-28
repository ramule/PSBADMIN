import { TestBed } from '@angular/core/testing';

import { AccessCustomizeMenuAddService } from './access-customize-menu-add.service';

describe('AccessCustomizeMenuAddService', () => {
  let service: AccessCustomizeMenuAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessCustomizeMenuAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
