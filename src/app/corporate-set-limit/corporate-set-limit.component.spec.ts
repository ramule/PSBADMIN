import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateSetLimitComponent } from './corporate-set-limit.component';

describe('CorporateSetLimitComponent', () => {
  let component: CorporateSetLimitComponent;
  let fixture: ComponentFixture<CorporateSetLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateSetLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateSetLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
