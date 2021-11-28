import { TestBed } from '@angular/core/testing';

import { ImpsMasterAddService } from './imps-master-add.service';

describe('ImpsMasterAddService', () => {
  let service: ImpsMasterAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsMasterAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
