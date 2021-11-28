import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOfferAddComponent } from './customer-offer-add.component';

describe('CustomerOfferAddComponent', () => {
  let component: CustomerOfferAddComponent;
  let fixture: ComponentFixture<CustomerOfferAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOfferAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOfferAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
