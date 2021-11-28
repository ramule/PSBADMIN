import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdministrationEditCorpUserComponent } from './admin-administration-edit-corp-user.component';

describe('AdminAdministrationEditCorpUserComponent', () => {
  let component: AdminAdministrationEditCorpUserComponent;
  let fixture: ComponentFixture<AdminAdministrationEditCorpUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdministrationEditCorpUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdministrationEditCorpUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
