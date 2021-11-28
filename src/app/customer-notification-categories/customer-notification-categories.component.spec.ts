import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNotificationCategoriesComponent } from './customer-notification-categories.component';

describe('CustomerNotificationCategoriesComponent', () => {
  let component: CustomerNotificationCategoriesComponent;
  let fixture: ComponentFixture<CustomerNotificationCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerNotificationCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNotificationCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
