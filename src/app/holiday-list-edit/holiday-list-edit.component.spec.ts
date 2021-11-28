import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayListEditComponent } from './holiday-list-edit.component';

describe('HolidayListEditComponent', () => {
  let component: HolidayListEditComponent;
  let fixture: ComponentFixture<HolidayListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
