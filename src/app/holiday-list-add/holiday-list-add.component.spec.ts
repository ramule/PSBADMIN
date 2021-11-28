import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayListAddComponent } from './holiday-list-add.component';

describe('HolidayListAddComponent', () => {
  let component: HolidayListAddComponent;
  let fixture: ComponentFixture<HolidayListAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayListAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
