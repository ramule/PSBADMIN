import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsCustomerDetailsComponent } from './imps-customer-details.component';

describe('ImpsCustomerDetailsComponent', () => {
  let component: ImpsCustomerDetailsComponent;
  let fixture: ComponentFixture<ImpsCustomerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsCustomerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsCustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
