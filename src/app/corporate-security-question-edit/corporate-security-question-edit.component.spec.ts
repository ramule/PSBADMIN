import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateSecurityQuestionEditComponent } from './corporate-security-question-edit.component';

describe('CorporateSecurityQuestionEditComponent', () => {
  let component: CorporateSecurityQuestionEditComponent;
  let fixture: ComponentFixture<CorporateSecurityQuestionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateSecurityQuestionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateSecurityQuestionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
