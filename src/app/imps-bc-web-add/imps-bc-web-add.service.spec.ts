import { TestBed } from '@angular/core/testing';

import { ImpsBcWebAddService } from './imps-bc-web-add.service';

describe('ImpsBcWebAddService', () => {
  let service: ImpsBcWebAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsBcWebAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
