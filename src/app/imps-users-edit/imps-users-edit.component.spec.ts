import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsUsersEditComponent } from './imps-users-edit.component';

describe('ImpsUsersEditComponent', () => {
  let component: ImpsUsersEditComponent;
  let fixture: ComponentFixture<ImpsUsersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsUsersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsUsersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
