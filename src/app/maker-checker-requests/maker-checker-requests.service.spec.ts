import { TestBed } from '@angular/core/testing';

import { MakerCheckerRequestsService } from './maker-checker-requests.service';

describe('MakerCheckerRequestsService', () => {
  let service: MakerCheckerRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakerCheckerRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
