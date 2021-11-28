import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInformationAddComponent } from './customer-information-add.component';

describe('CustomerInformationAddComponent', () => {
  let component: CustomerInformationAddComponent;
  let fixture: ComponentFixture<CustomerInformationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerInformationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInformationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
