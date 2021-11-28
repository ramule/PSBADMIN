import { TestBed } from '@angular/core/testing';

import { ImpsTaskService } from './imps-task.service';

describe('ImpsTaskService', () => {
  let service: ImpsTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
