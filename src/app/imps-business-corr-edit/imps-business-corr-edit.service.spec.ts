import { TestBed } from '@angular/core/testing';

import { ImpsBusinessCorrEditService } from './imps-business-corr-edit.service';

describe('ImpsBusinessCorrEditService', () => {
  let service: ImpsBusinessCorrEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsBusinessCorrEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
