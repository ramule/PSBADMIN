import { TestBed } from '@angular/core/testing';

import { ImpsCreditPoolAccDetailsService } from './imps-credit-pool-acc-details.service';

describe('ImpsCreditPoolAccDetailsService', () => {
  let service: ImpsCreditPoolAccDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsCreditPoolAccDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
