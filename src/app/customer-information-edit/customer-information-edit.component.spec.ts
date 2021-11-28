import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInformationEditComponent } from './customer-information-edit.component';

describe('CustomerInformationEditComponent', () => {
  let component: CustomerInformationEditComponent;
  let fixture: ComponentFixture<CustomerInformationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerInformationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInformationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
