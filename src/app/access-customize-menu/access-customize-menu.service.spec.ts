import { TestBed } from '@angular/core/testing';

import { AccessCustomizeMenuService } from './access-customize-menu.service';

describe('AccessCustomizeMenuService', () => {
  let service: AccessCustomizeMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessCustomizeMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
