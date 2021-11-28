import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsScheduleComponent } from './imps-schedule.component';

describe('ImpsScheduleComponent', () => {
  let component: ImpsScheduleComponent;
  let fixture: ComponentFixture<ImpsScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
