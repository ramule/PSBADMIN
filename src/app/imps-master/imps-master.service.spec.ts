import { TestBed } from '@angular/core/testing';

import { ImpsMasterService } from './imps-master.service';

describe('ImpsMasterService', () => {
  let service: ImpsMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
