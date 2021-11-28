import { TestBed } from '@angular/core/testing';

import { CorporateCheckerRequestsService } from './corporate-checker-requests.service';

describe('CorporateCheckerRequestsService', () => {
  let service: CorporateCheckerRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateCheckerRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
