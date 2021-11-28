import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsTransactionReportComponent } from './analytics-transaction-report.component';

describe('AnalyticsTransactionReportComponent', () => {
  let component: AnalyticsTransactionReportComponent;
  let fixture: ComponentFixture<AnalyticsTransactionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsTransactionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsTransactionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
