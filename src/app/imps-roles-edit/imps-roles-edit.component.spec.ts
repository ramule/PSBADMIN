import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsRolesEditComponent } from './imps-roles-edit.component';

describe('ImpsRolesEditComponent', () => {
  let component: ImpsRolesEditComponent;
  let fixture: ComponentFixture<ImpsRolesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsRolesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsRolesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
