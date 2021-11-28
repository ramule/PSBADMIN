import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterSecurityQuestionEditComponent } from './master-security-question-edit.component';

MasterSecurityQuestionEditComponent
describe('MasterSecurityQuestionEditComponent', () => {
  let component: MasterSecurityQuestionEditComponent;
  let fixture: ComponentFixture<MasterSecurityQuestionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSecurityQuestionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSecurityQuestionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
