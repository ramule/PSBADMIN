import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdapterAuditLogComponent } from './adapter-audit-log.component';

describe('AdapterAuditLogComponent', () => {
  let component: AdapterAuditLogComponent;
  let fixture: ComponentFixture<AdapterAuditLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdapterAuditLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdapterAuditLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
