import { TestBed } from '@angular/core/testing';

import { ImpsReportsAddService } from './imps-reports-add.service';

describe('ImpsReportsAddService', () => {
  let service: ImpsReportsAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsReportsAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
