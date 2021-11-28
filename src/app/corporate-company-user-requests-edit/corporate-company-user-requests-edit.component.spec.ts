import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCompanyUserRequestsEditComponent } from './corporate-company-user-requests-edit.component';

describe('CorporateCompanyUserRequestsEditComponent', () => {
  let component: CorporateCompanyUserRequestsEditComponent;
  let fixture: ComponentFixture<CorporateCompanyUserRequestsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCompanyUserRequestsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCompanyUserRequestsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
