import { TestBed } from '@angular/core/testing';

import { ImpsBcWebService } from './imps-bc-web.service';

describe('ImpsBcWebService', () => {
  let service: ImpsBcWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsBcWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
