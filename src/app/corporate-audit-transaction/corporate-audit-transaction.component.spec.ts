import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAuditTransactionComponent } from './corporate-audit-transaction.component';

describe('CorporateAuditTransactionComponent', () => {
  let component: CorporateAuditTransactionComponent;
  let fixture: ComponentFixture<CorporateAuditTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateAuditTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateAuditTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
