import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateApproverRequestsComponent } from './corporate-approver-requests.component';

describe('CorporateApproverRequestsComponent', () => {
  let component: CorporateApproverRequestsComponent;
  let fixture: ComponentFixture<CorporateApproverRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateApproverRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateApproverRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
