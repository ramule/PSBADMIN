import { TestBed } from '@angular/core/testing';

import { ImpsCreditPoolAccDetailsAddService } from './imps-credit-pool-acc-details-add.service';

describe('ImpsCreditPoolAccDetailsAddService', () => {
  let service: ImpsCreditPoolAccDetailsAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsCreditPoolAccDetailsAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
