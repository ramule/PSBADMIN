import { TestBed } from '@angular/core/testing';

import { ImpsSystemConfigService } from './imps-system-config.service';

describe('ImpsSystemConfigService', () => {
  let service: ImpsSystemConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsSystemConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
