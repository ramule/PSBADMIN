import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAddQuestionEditComponent } from './survey-add-question-edit.component';

describe('SurveyAddQuestionEditComponent', () => {
  let component: SurveyAddQuestionEditComponent;
  let fixture: ComponentFixture<SurveyAddQuestionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyAddQuestionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyAddQuestionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
