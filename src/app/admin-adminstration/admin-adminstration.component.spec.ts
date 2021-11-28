import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdminstrationComponent } from './admin-adminstration.component';

describe('AdminAdminstrationComponent', () => {
  let component: AdminAdminstrationComponent;
  let fixture: ComponentFixture<AdminAdminstrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdminstrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdminstrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
