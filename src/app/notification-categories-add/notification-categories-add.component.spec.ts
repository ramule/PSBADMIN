import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCategoriesAddComponent } from './notification-categories-add.component';

describe('NotificationCategoriesAddComponent', () => {
  let component: NotificationCategoriesAddComponent;
  let fixture: ComponentFixture<NotificationCategoriesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationCategoriesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationCategoriesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
