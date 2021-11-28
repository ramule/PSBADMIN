import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdministrationEditUserComponent } from './admin-administration-edit-user.component';

describe('AdminAdministrationEditUserComponent', () => {
  let component: AdminAdministrationEditUserComponent;
  let fixture: ComponentFixture<AdminAdministrationEditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdministrationEditUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdministrationEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
