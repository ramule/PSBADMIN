import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsAuditTrailComponent } from './imps-audit-trail.component';

describe('ImpsAuditTrailComponent', () => {
  let component: ImpsAuditTrailComponent;
  let fixture: ComponentFixture<ImpsAuditTrailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsAuditTrailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsAuditTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
