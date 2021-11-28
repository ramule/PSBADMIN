import { TestBed } from '@angular/core/testing';

import { ImpsTaskAddService } from './imps-task-add.service';

describe('ImpsTaskAddService', () => {
  let service: ImpsTaskAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsTaskAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
