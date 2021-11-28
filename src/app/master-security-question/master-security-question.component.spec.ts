import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterSecurityQuestionComponent } from './master-security-question.component';

MasterSecurityQuestionComponent
describe('MasterSecurityQuestionComponent', () => {
  let component: MasterSecurityQuestionComponent;
  let fixture: ComponentFixture<MasterSecurityQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSecurityQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSecurityQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
