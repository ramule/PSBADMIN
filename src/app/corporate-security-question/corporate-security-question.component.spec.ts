import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateSecurityQuestionComponent } from './corporate-security-question.component';

describe('CorporateSecurityQuestionComponent', () => {
  let component: CorporateSecurityQuestionComponent;
  let fixture: ComponentFixture<CorporateSecurityQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateSecurityQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateSecurityQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
