import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateCompanyAddComponent } from './corporate-company-add.component';

describe('CorporateCompanyAddComponent', () => {
  let component: CorporateCompanyAddComponent;
  let fixture: ComponentFixture<CorporateCompanyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateCompanyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateCompanyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
