import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginIntoComponent } from './login-into.component';

describe('LoginIntoComponent', () => {
  let component: LoginIntoComponent;
  let fixture: ComponentFixture<LoginIntoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginIntoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginIntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
