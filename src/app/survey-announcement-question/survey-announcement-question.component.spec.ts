import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAnnouncementQuestionComponent } from './survey-announcement-question.component';

describe('SurveyAnnouncementQuestionComponent', () => {
  let component: SurveyAnnouncementQuestionComponent;
  let fixture: ComponentFixture<SurveyAnnouncementQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyAnnouncementQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyAnnouncementQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
