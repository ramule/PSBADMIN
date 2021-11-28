import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditTransactionsComponent } from './audit-transactions.component';

describe('AuditTransactionsComponent', () => {
  let component: AuditTransactionsComponent;
  let fixture: ComponentFixture<AuditTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
