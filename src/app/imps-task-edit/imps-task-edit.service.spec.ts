import { TestBed } from '@angular/core/testing';

import { ImpsTaskEditService } from './imps-task-edit.service';

describe('ImpsTaskEditService', () => {
  let service: ImpsTaskEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsTaskEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
