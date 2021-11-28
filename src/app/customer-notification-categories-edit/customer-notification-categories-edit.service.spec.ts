import { TestBed } from '@angular/core/testing';

import { CustomerNotificationCategoriesEditService } from './customer-notification-categories-edit.service';

describe('CustomerNotificationCategoriesEditService', () => {
  let service: CustomerNotificationCategoriesEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerNotificationCategoriesEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
