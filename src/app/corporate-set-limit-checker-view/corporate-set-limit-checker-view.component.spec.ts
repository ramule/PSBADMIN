import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateSetLimitCheckerViewComponent } from './corporate-set-limit-checker-view.component';

describe('CorporateSetLimitCheckerViewComponent', () => {
  let component: CorporateSetLimitCheckerViewComponent;
  let fixture: ComponentFixture<CorporateSetLimitCheckerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateSetLimitCheckerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateSetLimitCheckerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
