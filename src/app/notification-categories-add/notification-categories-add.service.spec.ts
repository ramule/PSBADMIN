import { TestBed } from '@angular/core/testing';

import { NotificationCategoriesAddService } from './notification-categories-add.service';

describe('NotificationCategoriesAddService', () => {
  let service: NotificationCategoriesAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationCategoriesAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
