import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDeviceMasterEditComponent } from './customer-device-master-edit.component';

describe('CustomerDeviceMasterEditComponent', () => {
  let component: CustomerDeviceMasterEditComponent;
  let fixture: ComponentFixture<CustomerDeviceMasterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDeviceMasterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDeviceMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
