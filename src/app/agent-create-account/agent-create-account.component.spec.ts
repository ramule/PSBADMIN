import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCreateAccountComponent } from './agent-create-account.component';

describe('AgentCreateAccountComponent', () => {
  let component: AgentCreateAccountComponent;
  let fixture: ComponentFixture<AgentCreateAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentCreateAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentCreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
