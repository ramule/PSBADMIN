import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCategoryAddComponent } from './insurance-category-add.component';

describe('InsuranceCategoryAddComponent', () => {
  let component: InsuranceCategoryAddComponent;
  let fixture: ComponentFixture<InsuranceCategoryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceCategoryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceCategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
