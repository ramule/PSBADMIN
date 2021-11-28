import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDeviceMasterComponent } from './customer-device-master.component';

describe('CustomerDeviceMasterComponent', () => {
  let component: CustomerDeviceMasterComponent;
  let fixture: ComponentFixture<CustomerDeviceMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDeviceMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDeviceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
