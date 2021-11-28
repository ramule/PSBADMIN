import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsReportCategoryAddComponent } from './imps-report-category-add.component';

describe('ImpsReportCategoryAddComponent', () => {
  let component: ImpsReportCategoryAddComponent;
  let fixture: ComponentFixture<ImpsReportCategoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsReportCategoryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsReportCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
