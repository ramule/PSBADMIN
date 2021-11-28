import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsScheduleAddComponent } from './imps-schedule-add.component';

describe('ImpsScheduleAddComponent', () => {
  let component: ImpsScheduleAddComponent;
  let fixture: ComponentFixture<ImpsScheduleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsScheduleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsScheduleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
