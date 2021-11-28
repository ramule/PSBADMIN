import { TestBed } from '@angular/core/testing';

import { ImpsSystemConfigAddService } from './imps-system-config-add.service';

describe('ImpsSystemConfigAddService', () => {
  let service: ImpsSystemConfigAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsSystemConfigAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
