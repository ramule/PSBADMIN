import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceProductEditComponent } from './insurance-product-edit.component';

describe('InsuranceProductEditComponent', () => {
  let component: InsuranceProductEditComponent;
  let fixture: ComponentFixture<InsuranceProductEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceProductEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
