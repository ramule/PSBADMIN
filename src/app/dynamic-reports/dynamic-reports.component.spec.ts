import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicReportsComponent } from './dynamic-reports.component';

describe('DynamicReportsComponent', () => {
  let component: DynamicReportsComponent;
  let fixture: ComponentFixture<DynamicReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
