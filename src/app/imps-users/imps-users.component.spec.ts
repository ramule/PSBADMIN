import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsUsersComponent } from './imps-users.component';

describe('ImpsUsersComponent', () => {
  let component: ImpsUsersComponent;
  let fixture: ComponentFixture<ImpsUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
