import { TestBed } from '@angular/core/testing';

import { MakerRequestsService } from './maker-requests.service';

describe('MakerRequestsService', () => {
  let service: MakerRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakerRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
