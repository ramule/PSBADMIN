import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCategoryEditComponent } from './insurance-category-edit.component';

describe('InsuranceCategoryEditComponent', () => {
  let component: InsuranceCategoryEditComponent;
  let fixture: ComponentFixture<InsuranceCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
