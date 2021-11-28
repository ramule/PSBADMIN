import { TestBed } from '@angular/core/testing';

import { SendmailCustomersService } from './sendmail-customers.service';

describe('SendmailCustomersService', () => {
  let service: SendmailCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendmailCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
