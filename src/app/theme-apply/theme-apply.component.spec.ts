import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeApplyComponent } from './theme-apply.component';

describe('ThemeApplyComponent', () => {
  let component: ThemeApplyComponent;
  let fixture: ComponentFixture<ThemeApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
