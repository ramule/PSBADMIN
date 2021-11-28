import { TestBed } from '@angular/core/testing';

import { ActivityResponseTimeService } from './activity-response-time.service';

describe('ActivityResponseTimeService', () => {
  let service: ActivityResponseTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityResponseTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
