import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOfferEditComponent } from './customer-offer-edit.component';

describe('CustomerOfferEditComponent', () => {
  let component: CustomerOfferEditComponent;
  let fixture: ComponentFixture<CustomerOfferEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOfferEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOfferEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
