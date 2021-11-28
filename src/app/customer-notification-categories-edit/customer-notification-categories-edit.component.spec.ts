import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNotificationCategoriesEditComponent } from './customer-notification-categories-edit.component';

describe('CustomerNotificationCategoriesEditComponent', () => {
  let component: CustomerNotificationCategoriesEditComponent;
  let fixture: ComponentFixture<CustomerNotificationCategoriesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerNotificationCategoriesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNotificationCategoriesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
