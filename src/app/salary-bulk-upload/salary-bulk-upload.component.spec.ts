import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryBulkUploadComponent } from './salary-bulk-upload.component';

describe('SalaryBulkUploadComponent', () => {
  let component: SalaryBulkUploadComponent;
  let fixture: ComponentFixture<SalaryBulkUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryBulkUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryBulkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
