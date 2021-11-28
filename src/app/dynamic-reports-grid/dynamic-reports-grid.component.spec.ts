import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicReportsGridComponent } from './dynamic-reports-grid.component';

describe('DynamicReportsGridComponent', () => {
  let component: DynamicReportsGridComponent;
  let fixture: ComponentFixture<DynamicReportsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicReportsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicReportsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
