import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleTypeAddComponent } from './role-type-add.component';

describe('RoleTypeAddComponent', () => {
  let component: RoleTypeAddComponent;
  let fixture: ComponentFixture<RoleTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
