import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdministrationEditRoleComponent } from './admin-administration-edit-role.component';

describe('AdminAdministrationEditRoleComponent', () => {
  let component: AdminAdministrationEditRoleComponent;
  let fixture: ComponentFixture<AdminAdministrationEditRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdministrationEditRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdministrationEditRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
