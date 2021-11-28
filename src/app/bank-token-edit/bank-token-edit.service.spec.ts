import { TestBed } from '@angular/core/testing';

import { BankTokenEditService } from './bank-token-edit.service';

describe('BankTokenEditService', () => {
  let service: BankTokenEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankTokenEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
