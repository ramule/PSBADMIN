import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsRolesComponent } from './imps-roles.component';

describe('ImpsRolesComponent', () => {
  let component: ImpsRolesComponent;
  let fixture: ComponentFixture<ImpsRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
