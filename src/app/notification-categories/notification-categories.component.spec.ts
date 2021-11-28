import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCategoriesComponent } from './notification-categories.component';

describe('NotificationCategoriesComponent', () => {
  let component: NotificationCategoriesComponent;
  let fixture: ComponentFixture<NotificationCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
