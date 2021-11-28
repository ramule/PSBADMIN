import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBranchRegistrationComponent } from './register-branch-registration.component';

describe('RegisterBranchRegistrationComponent', () => {
  let component: RegisterBranchRegistrationComponent;
  let fixture: ComponentFixture<RegisterBranchRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterBranchRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBranchRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
