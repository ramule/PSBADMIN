import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentMoneyReconcilationComponent } from './agent-money-reconcilation.component';

describe('AgentMoneyReconcilationComponent', () => {
  let component: AgentMoneyReconcilationComponent;
  let fixture: ComponentFixture<AgentMoneyReconcilationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentMoneyReconcilationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentMoneyReconcilationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
