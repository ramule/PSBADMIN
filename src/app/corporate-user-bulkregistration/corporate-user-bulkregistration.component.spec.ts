import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserBulkregistrationComponent } from './corporate-user-bulkregistration.component';

describe('CorporateUserBulkregistrationComponent', () => {
  let component: CorporateUserBulkregistrationComponent;
  let fixture: ComponentFixture<CorporateUserBulkregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateUserBulkregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserBulkregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
