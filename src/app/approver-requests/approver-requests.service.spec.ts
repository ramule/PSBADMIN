import { TestBed } from '@angular/core/testing';

import { ApproverRequestsService } from './approver-requests.service';

describe('ApproverRequestsService', () => {
  let service: ApproverRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproverRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
