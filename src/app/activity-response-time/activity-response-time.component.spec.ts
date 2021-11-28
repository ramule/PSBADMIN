import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityResponseTimeComponent } from './activity-response-time.component';

describe('ActivityResponseTimeComponent', () => {
  let component: ActivityResponseTimeComponent;
  let fixture: ComponentFixture<ActivityResponseTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityResponseTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityResponseTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
