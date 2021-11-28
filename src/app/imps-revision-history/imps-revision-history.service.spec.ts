import { TestBed } from '@angular/core/testing';

import { ImpsRevisionHistoryService } from './imps-revision-history.service';

describe('ImpsRevisionHistoryService', () => {
  let service: ImpsRevisionHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsRevisionHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
