import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsScheduleEditComponent } from './imps-schedule-edit.component';

describe('ImpsScheduleEditComponent', () => {
  let component: ImpsScheduleEditComponent;
  let fixture: ComponentFixture<ImpsScheduleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsScheduleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsScheduleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
