import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOmniChannelReportComponent } from './admin-omni-channel-report.component';

describe('AdminOmniChannelReportComponent', () => {
  let component: AdminOmniChannelReportComponent;
  let fixture: ComponentFixture<AdminOmniChannelReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOmniChannelReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOmniChannelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
