import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicReportsAddComponent } from './dynamic-reports-add.component';

describe('DynamicReportsAddComponent', () => {
  let component: DynamicReportsAddComponent;
  let fixture: ComponentFixture<DynamicReportsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicReportsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicReportsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
