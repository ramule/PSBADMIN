import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWiseBalanceComponent } from './customer-wise-balance.component';

describe('CustomerWiseBalanceComponent', () => {
  let component: CustomerWiseBalanceComponent;
  let fixture: ComponentFixture<CustomerWiseBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerWiseBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerWiseBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
