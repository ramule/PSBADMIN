import { TestBed } from '@angular/core/testing';

import { DynamicReportsAddService } from './dynamic-reports-add.service';

describe('DynamicReportsAddService', () => {
  let service: DynamicReportsAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicReportsAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
