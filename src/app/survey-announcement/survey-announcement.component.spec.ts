import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAnnouncementComponent } from './survey-announcement.component';

describe('SurveyAnnouncementComponent', () => {
  let component: SurveyAnnouncementComponent;
  let fixture: ComponentFixture<SurveyAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
