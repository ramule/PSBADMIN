import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicReportsDetailsAddComponent } from './dynamic-reports-details-add.component';

describe('DynamicReportsDetailsAddComponent', () => {
  let component: DynamicReportsDetailsAddComponent;
  let fixture: ComponentFixture<DynamicReportsDetailsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicReportsDetailsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicReportsDetailsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
