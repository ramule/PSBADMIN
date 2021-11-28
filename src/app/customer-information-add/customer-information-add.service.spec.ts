import { TestBed } from '@angular/core/testing';

import { CustomerInformationAddService } from './customer-information-add.service';

describe('CustomerInformationAddService', () => {
  let service: CustomerInformationAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerInformationAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
