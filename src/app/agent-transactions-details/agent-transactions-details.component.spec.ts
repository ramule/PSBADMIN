import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentTransactionsDetailsComponent } from './agent-transactions-details.component';

describe('AgentTransactionsDetailsComponent', () => {
  let component: AgentTransactionsDetailsComponent;
  let fixture: ComponentFixture<AgentTransactionsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentTransactionsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentTransactionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
