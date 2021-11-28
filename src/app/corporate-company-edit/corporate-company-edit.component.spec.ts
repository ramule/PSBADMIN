import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCompanyEditComponent } from './corporate-company-edit.component';

describe('CorporateCompanyEditComponent', () => {
  let component: CorporateCompanyEditComponent;
  let fixture: ComponentFixture<CorporateCompanyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCompanyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCompanyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
