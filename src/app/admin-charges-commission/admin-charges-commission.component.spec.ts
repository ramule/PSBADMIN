import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChargesCommissionComponent } from './admin-charges-commission.component';

describe('AdminChargesCommissionComponent', () => {
  let component: AdminChargesCommissionComponent;
  let fixture: ComponentFixture<AdminChargesCommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChargesCommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChargesCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
