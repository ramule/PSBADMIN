import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsUsersAddComponent } from './imps-users-add.component';

describe('ImpsUsersAddComponent', () => {
  let component: ImpsUsersAddComponent;
  let fixture: ComponentFixture<ImpsUsersAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsUsersAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsUsersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
