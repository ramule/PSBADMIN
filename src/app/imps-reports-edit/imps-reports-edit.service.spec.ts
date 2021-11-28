import { TestBed } from '@angular/core/testing';

import { ImpsReportsEditService } from './imps-reports-edit.service';

describe('ImpsReportsEditService', () => {
  let service: ImpsReportsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsReportsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
