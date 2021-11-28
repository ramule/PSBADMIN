import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsServiceReqReportComponent } from './analytics-service-req-report.component';

describe('AnalyticsServiceReqReportComponent', () => {
  let component: AnalyticsServiceReqReportComponent;
  let fixture: ComponentFixture<AnalyticsServiceReqReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsServiceReqReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsServiceReqReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
