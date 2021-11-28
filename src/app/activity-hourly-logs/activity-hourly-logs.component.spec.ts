import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityHourlyLogsComponent } from './activity-hourly-logs.component';

describe('ActivityHourlyLogsComponent', () => {
  let component: ActivityHourlyLogsComponent;
  let fixture: ComponentFixture<ActivityHourlyLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityHourlyLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityHourlyLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
