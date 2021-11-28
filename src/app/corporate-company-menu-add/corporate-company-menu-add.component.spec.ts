import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCompanyMenuAddComponent } from './corporate-company-menu-add.component';

describe('CorporateCompanyMenuAddComponent', () => {
  let component: CorporateCompanyMenuAddComponent;
  let fixture: ComponentFixture<CorporateCompanyMenuAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCompanyMenuAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCompanyMenuAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
