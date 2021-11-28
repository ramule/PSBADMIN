import { TestBed } from '@angular/core/testing';

import { CustomerInformationEditService } from './customer-information-edit.service';

describe('CustomerInformationEditService', () => {
  let service: CustomerInformationEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerInformationEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
