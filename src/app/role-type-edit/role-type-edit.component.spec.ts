import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleTypeEditComponent } from './role-type-edit.component';

describe('RoleTypeEditComponent', () => {
  let component: RoleTypeEditComponent;
  let fixture: ComponentFixture<RoleTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
