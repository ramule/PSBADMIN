import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicReportsDetailsComponent } from './dynamic-reports-details.component';

describe('DynamicReportsDetailsComponent', () => {
  let component: DynamicReportsDetailsComponent;
  let fixture: ComponentFixture<DynamicReportsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicReportsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicReportsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
