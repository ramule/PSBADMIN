import { TestBed } from '@angular/core/testing';

import { ImpsMasterEditService } from './imps-master-edit.service';

describe('ImpsMasterEditService', () => {
  let service: ImpsMasterEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsMasterEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
