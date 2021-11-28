import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChargesCommissionEditComponent } from './admin-charges-commission-edit.component';

describe('AdminChargesCommissionEditComponent', () => {
  let component: AdminChargesCommissionEditComponent;
  let fixture: ComponentFixture<AdminChargesCommissionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChargesCommissionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChargesCommissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
