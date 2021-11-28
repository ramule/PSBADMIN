import { TestBed } from '@angular/core/testing';

import { ImpsSystemStatusEditService } from './imps-system-status-edit.service';

describe('ImpsSystemStatusEditService', () => {
  let service: ImpsSystemStatusEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsSystemStatusEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
