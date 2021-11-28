import { TestBed } from '@angular/core/testing';

import { ImpsEcollectionAddService } from './imps-ecollection-add.service';

describe('ImpsEcollectionAddService', () => {
  let service: ImpsEcollectionAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsEcollectionAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
