import { TestBed } from '@angular/core/testing';

import { AccessCustomizeMenuDetailsService } from './access-customize-menu-details.service';

describe('AccessCustomizeMenuDetailsService', () => {
  let service: AccessCustomizeMenuDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessCustomizeMenuDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
