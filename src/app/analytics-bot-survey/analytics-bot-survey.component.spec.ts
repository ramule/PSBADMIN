import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsBotSurveyComponent } from './analytics-bot-survey.component';

describe('AnalyticsBotSurveyComponent', () => {
  let component: AnalyticsBotSurveyComponent;
  let fixture: ComponentFixture<AnalyticsBotSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsBotSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsBotSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
