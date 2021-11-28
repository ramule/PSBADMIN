import { TestBed } from '@angular/core/testing';

import { NotificationCategoriesEditService } from './notification-categories-edit.service';

describe('NotificationCategoriesEditService', () => {
  let service: NotificationCategoriesEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationCategoriesEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
