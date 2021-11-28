import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityNotificationSettingEditComponent } from './activity-notification-setting-edit.component';

describe('ActivityNotificationSettingEditComponent', () => {
  let component: ActivityNotificationSettingEditComponent;
  let fixture: ComponentFixture<ActivityNotificationSettingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityNotificationSettingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityNotificationSettingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
