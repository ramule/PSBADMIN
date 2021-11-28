import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAuditActivityLogComponent } from './corporate-audit-activity-log.component';

describe('CorporateAuditActivityLogComponent', () => {
  let component: CorporateAuditActivityLogComponent;
  let fixture: ComponentFixture<CorporateAuditActivityLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateAuditActivityLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateAuditActivityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
