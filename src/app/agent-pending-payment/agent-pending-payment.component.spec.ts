import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPendingPaymentComponent } from './agent-pending-payment.component';

describe('AgentPendingPaymentComponent', () => {
  let component: AgentPendingPaymentComponent;
  let fixture: ComponentFixture<AgentPendingPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentPendingPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPendingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
