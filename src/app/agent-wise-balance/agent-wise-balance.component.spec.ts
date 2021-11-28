import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentWiseBalanceComponent } from './agent-wise-balance.component';

describe('AgentWiseBalanceComponent', () => {
  let component: AgentWiseBalanceComponent;
  let fixture: ComponentFixture<AgentWiseBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentWiseBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentWiseBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
