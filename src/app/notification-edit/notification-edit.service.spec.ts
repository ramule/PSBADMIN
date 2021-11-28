import { TestBed } from '@angular/core/testing';

import { NotificationEditService } from './notification-edit.service';

describe('NotificationEditService', () => {
  let service: NotificationEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
