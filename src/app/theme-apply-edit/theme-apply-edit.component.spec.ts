import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeApplyEditComponent } from './theme-apply-edit.component';

describe('ThemeApplyEditComponent', () => {
  let component: ThemeApplyEditComponent;
  let fixture: ComponentFixture<ThemeApplyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeApplyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeApplyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
