import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateSetLimitViewComponent } from './corporate-set-limit-view.component';

describe('CorporateSetLimitViewComponent', () => {
  let component: CorporateSetLimitViewComponent;
  let fixture: ComponentFixture<CorporateSetLimitViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateSetLimitViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateSetLimitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
