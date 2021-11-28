import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsMessagingReportComponent } from './analytics-messaging-report.component';

describe('AnalyticsMessagingReportComponent', () => {
  let component: AnalyticsMessagingReportComponent;
  let fixture: ComponentFixture<AnalyticsMessagingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsMessagingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsMessagingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
