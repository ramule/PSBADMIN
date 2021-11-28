import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicReportsDetailsEditComponent } from './dynamic-reports-details-edit.component';

describe('DynamicReportsDetailsEditComponent', () => {
  let component: DynamicReportsDetailsEditComponent;
  let fixture: ComponentFixture<DynamicReportsDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicReportsDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicReportsDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
