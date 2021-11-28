import { TestBed } from '@angular/core/testing';

import { ImpsBcWebEditService } from './imps-bc-web-edit.service';

describe('ImpsBcWebEditService', () => {
  let service: ImpsBcWebEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpsBcWebEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
