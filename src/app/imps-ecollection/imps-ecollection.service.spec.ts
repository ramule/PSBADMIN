import { TestBed } from '@angular/core/testing';

import { ImpsEcollectionService } from './imps-ecollection.service';

describe('ImpsEcollectionService', () => {
  let service: ImpsEcollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsEcollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
