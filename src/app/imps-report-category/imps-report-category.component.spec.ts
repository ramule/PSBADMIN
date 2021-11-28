import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsReportCategoryComponent } from './imps-report-category.component';

describe('ImpsReportCategoryComponent', () => {
  let component: ImpsReportCategoryComponent;
  let fixture: ComponentFixture<ImpsReportCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsReportCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsReportCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
