import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAnnouncementDetailsComponent } from './survey-announcement-details.component';

describe('SurveyAnnouncementDetailsComponent', () => {
  let component: SurveyAnnouncementDetailsComponent;
  let fixture: ComponentFixture<SurveyAnnouncementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyAnnouncementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyAnnouncementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
