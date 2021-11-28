import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCategoryComponent } from './insurance-category.component';

describe('InsuranceCategoryComponent', () => {
  let component: InsuranceCategoryComponent;
  let fixture: ComponentFixture<InsuranceCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
