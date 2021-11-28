import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverRequestsComponent } from './approver-requests.component';

describe('ApproverRequestsComponent', () => {
  let component: ApproverRequestsComponent;
  let fixture: ComponentFixture<ApproverRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproverRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
