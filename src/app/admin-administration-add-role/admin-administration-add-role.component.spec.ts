import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdministrationAddRoleComponent } from './admin-administration-add-role.component';

describe('AdminAdministrationAddRoleComponent', () => {
  let component: AdminAdministrationAddRoleComponent;
  let fixture: ComponentFixture<AdminAdministrationAddRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdministrationAddRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdministrationAddRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
