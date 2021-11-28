import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicReportsEditComponent } from './dynamic-reports-edit.component';

describe('DynamicReportsEditComponent', () => {
  let component: DynamicReportsEditComponent;
  let fixture: ComponentFixture<DynamicReportsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicReportsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicReportsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
