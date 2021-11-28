import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBulkRegistrationComponent } from './customer-bulk-registration.component';

describe('CustomerBulkRegistrationComponent', () => {
  let component: CustomerBulkRegistrationComponent;
  let fixture: ComponentFixture<CustomerBulkRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerBulkRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBulkRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
