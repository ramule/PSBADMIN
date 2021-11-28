import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFrsComponent } from './customer-frs.component';

describe('CustomerFrsComponent', () => {
  let component: CustomerFrsComponent;
  let fixture: ComponentFixture<CustomerFrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
