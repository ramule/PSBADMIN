import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayListBulkAddComponent } from './holiday-list-bulk-add.component';

describe('HolidayListBulkAddComponent', () => {
  let component: HolidayListBulkAddComponent;
  let fixture: ComponentFixture<HolidayListBulkAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayListBulkAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayListBulkAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
