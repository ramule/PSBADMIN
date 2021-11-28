import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsRolesAddComponent } from './imps-roles-add.component';

describe('ImpsRolesAddComponent', () => {
  let component: ImpsRolesAddComponent;
  let fixture: ComponentFixture<ImpsRolesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsRolesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsRolesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
