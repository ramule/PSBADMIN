import { TestBed } from '@angular/core/testing';

import { ImpsSystemConfigEditService } from './imps-system-config-edit.service';

describe('ImpsSystemConfigEditService', () => {
  let service: ImpsSystemConfigEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsSystemConfigEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
