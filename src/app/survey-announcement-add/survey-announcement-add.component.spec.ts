import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyAnnouncementAddComponent } from './survey-announcement-add.component';


describe('SurveyAnnouncementAddComponent', () => {
  let component: SurveyAnnouncementAddComponent;
  let fixture: ComponentFixture<SurveyAnnouncementAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyAnnouncementAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyAnnouncementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
