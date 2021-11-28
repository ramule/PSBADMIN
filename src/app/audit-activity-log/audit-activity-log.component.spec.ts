import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditActivityLogComponent } from './audit-activity-log.component';

describe('AuditActivityLogComponent', () => {
  let component: AuditActivityLogComponent;
  let fixture: ComponentFixture<AuditActivityLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditActivityLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditActivityLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
