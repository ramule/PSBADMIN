import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceProductAddComponent } from './insurance-product-add.component';

describe('InsuranceProductAddComponent', () => {
  let component: InsuranceProductAddComponent;
  let fixture: ComponentFixture<InsuranceProductAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceProductAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
