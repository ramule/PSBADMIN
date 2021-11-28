import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdministrationAddUserComponent } from './admin-administration-add-user.component';

describe('AdminAdministrationAddUserComponent', () => {
  let component: AdminAdministrationAddUserComponent;
  let fixture: ComponentFixture<AdminAdministrationAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdministrationAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdministrationAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
