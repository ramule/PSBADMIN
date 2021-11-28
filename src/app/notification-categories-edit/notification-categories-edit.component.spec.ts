import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCategoriesEditComponent } from './notification-categories-edit.component';

describe('NotificationCategoriesEditComponent', () => {
  let component: NotificationCategoriesEditComponent;
  let fixture: ComponentFixture<NotificationCategoriesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationCategoriesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationCategoriesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
