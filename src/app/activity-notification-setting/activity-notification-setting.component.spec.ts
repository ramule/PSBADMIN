import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityNotificationSettingComponent } from './activity-notification-setting.component';

describe('ActivityNotificationSettingComponent', () => {
  let component: ActivityNotificationSettingComponent;
  let fixture: ComponentFixture<ActivityNotificationSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityNotificationSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityNotificationSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
