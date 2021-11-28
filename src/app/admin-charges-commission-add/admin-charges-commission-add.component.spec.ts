import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChargesCommissionAddComponent } from './admin-charges-commission-add.component';

describe('AdminChargesCommissionAddComponent', () => {
  let component: AdminChargesCommissionAddComponent;
  let fixture: ComponentFixture<AdminChargesCommissionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChargesCommissionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChargesCommissionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
