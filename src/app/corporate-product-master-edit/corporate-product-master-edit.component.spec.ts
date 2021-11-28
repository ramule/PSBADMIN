import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateProductMasterEditComponent } from './corporate-product-master-edit.component';

describe('CorporateProductMasterEditComponent', () => {
  let component: CorporateProductMasterEditComponent;
  let fixture: ComponentFixture<CorporateProductMasterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateProductMasterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateProductMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
