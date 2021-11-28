import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCompanyMenuEditComponent } from './corporate-company-menu-edit.component';

describe('CorporateCompanyMenuEditComponent', () => {
  let component: CorporateCompanyMenuEditComponent;
  let fixture: ComponentFixture<CorporateCompanyMenuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCompanyMenuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCompanyMenuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
