import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkNotificationSendComponent } from './bulk-notification-send.component';

describe('BulkNotificationSendComponent', () => {
  let component: BulkNotificationSendComponent;
  let fixture: ComponentFixture<BulkNotificationSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkNotificationSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkNotificationSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
