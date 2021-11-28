import { TestBed } from '@angular/core/testing';

import { ImpsEcollectionRequestLogService } from './imps-ecollection-request-log.service';

describe('ImpsEcollectionRequestLogService', () => {
  let service: ImpsEcollectionRequestLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsEcollectionRequestLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
