import { TestBed } from '@angular/core/testing';

import { CustomerNotificationCategoriesService } from './customer-notification-categories.service';

describe('CustomerNotificationCategoriesService', () => {
  let service: CustomerNotificationCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerNotificationCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
