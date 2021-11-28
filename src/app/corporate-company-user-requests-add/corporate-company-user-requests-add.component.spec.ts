import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCompanyUserRequestsAddComponent } from './corporate-company-user-requests-add.component';

describe('CorporateCompanyUserRequestsAddComponent', () => {
  let component: CorporateCompanyUserRequestsAddComponent;
  let fixture: ComponentFixture<CorporateCompanyUserRequestsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCompanyUserRequestsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCompanyUserRequestsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
