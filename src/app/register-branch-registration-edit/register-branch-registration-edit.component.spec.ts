import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBranchRegistrationEditComponent } from './register-branch-registration-edit.component';

describe('RegisterBranchRegistrationEditComponent', () => {
  let component: RegisterBranchRegistrationEditComponent;
  let fixture: ComponentFixture<RegisterBranchRegistrationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterBranchRegistrationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBranchRegistrationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
