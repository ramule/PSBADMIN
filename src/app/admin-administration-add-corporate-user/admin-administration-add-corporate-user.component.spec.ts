import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdministrationAddCorporateUserComponent } from './admin-administration-add-corporate-user.component';

describe('AdminAdministrationAddCorporateUserComponent', () => {
  let component: AdminAdministrationAddCorporateUserComponent;
  let fixture: ComponentFixture<AdminAdministrationAddCorporateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdministrationAddCorporateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdministrationAddCorporateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
