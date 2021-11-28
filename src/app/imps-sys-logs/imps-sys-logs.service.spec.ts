import { TestBed } from '@angular/core/testing';

import { ImpsSysLogsService } from './imps-sys-logs.service';

describe('ImpsSysLogsService', () => {
  let service: ImpsSysLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsSysLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
