import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNotificationCategoriesAddComponent } from './customer-notification-categories-add.component';

describe('CustomerNotificationCategoriesAddComponent', () => {
  let component: CustomerNotificationCategoriesAddComponent;
  let fixture: ComponentFixture<CustomerNotificationCategoriesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerNotificationCategoriesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNotificationCategoriesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
