import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateProductMasterComponent } from './corporate-product-master.component';

describe('CorporateProductMasterComponent', () => {
  let component: CorporateProductMasterComponent;
  let fixture: ComponentFixture<CorporateProductMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateProductMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateProductMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
