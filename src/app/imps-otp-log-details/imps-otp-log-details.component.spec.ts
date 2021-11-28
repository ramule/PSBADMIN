import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsOtpLogDetailsComponent } from './imps-otp-log-details.component';

describe('ImpsOtpLogDetailsComponent', () => {
  let component: ImpsOtpLogDetailsComponent;
  let fixture: ComponentFixture<ImpsOtpLogDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsOtpLogDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsOtpLogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
