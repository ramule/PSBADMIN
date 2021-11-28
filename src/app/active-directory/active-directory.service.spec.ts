import { TestBed } from '@angular/core/testing';

import { ActiveDirectoryService } from './active-directory.service';

describe('ActiveDirectoryService', () => {
  let service: ActiveDirectoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveDirectoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
