import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAddQuestionComponent } from './survey-add-question.component';

describe('SurveyAddQuestionComponent', () => {
  let component: SurveyAddQuestionComponent;
  let fixture: ComponentFixture<SurveyAddQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyAddQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyAddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
