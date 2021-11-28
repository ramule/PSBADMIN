import { TestBed } from '@angular/core/testing';

import { ImpsCreditPoolAccDetailsEditService } from './imps-credit-pool-acc-details-edit.service';

describe('ImpsCreditPoolAccDetailsEditService', () => {
  let service: ImpsCreditPoolAccDetailsEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsCreditPoolAccDetailsEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
