import { TestBed } from '@angular/core/testing';

import { CustomerNotificationCategoriesAddService } from './customer-notification-categories-add.service';

describe('CustomerNotificationCategoriesAddService', () => {
  let service: CustomerNotificationCategoriesAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerNotificationCategoriesAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
