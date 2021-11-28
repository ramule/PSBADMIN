import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAgentEditComponent } from './customer-agent-edit.component';

describe('CustomerAgentEditComponent', () => {
  let component: CustomerAgentEditComponent;
  let fixture: ComponentFixture<CustomerAgentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAgentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAgentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
