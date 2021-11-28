import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAnnouncementQuestionEditComponent } from './survey-announcement-question-edit.component';

describe('SurveyAnnouncementQuestionEditComponent', () => {
  let component: SurveyAnnouncementQuestionEditComponent;
  let fixture: ComponentFixture<SurveyAnnouncementQuestionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyAnnouncementQuestionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyAnnouncementQuestionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
