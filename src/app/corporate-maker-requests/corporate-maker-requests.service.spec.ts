import { TestBed } from '@angular/core/testing';

import { CorporateMakerRequestsService } from './corporate-maker-requests.service';

describe('CorporateMakerRequestsService', () => {
  let service: CorporateMakerRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateMakerRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
