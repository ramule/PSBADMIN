import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCompanyMenuComponent } from './corporate-company-menu.component';

describe('CorporateCompanyMenuComponent', () => {
  let component: CorporateCompanyMenuComponent;
  let fixture: ComponentFixture<CorporateCompanyMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCompanyMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCompanyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
