import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCompanyUserRequestsComponent } from './corporate-company-user-requests.component';

describe('CorporateCompanyUserRequestsComponent', () => {
  let component: CorporateCompanyUserRequestsComponent;
  let fixture: ComponentFixture<CorporateCompanyUserRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCompanyUserRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCompanyUserRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
