import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsReportCategoryEditComponent } from './imps-report-category-edit.component';

describe('ImpsReportCategoryEditComponent', () => {
  let component: ImpsReportCategoryEditComponent;
  let fixture: ComponentFixture<ImpsReportCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsReportCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsReportCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
