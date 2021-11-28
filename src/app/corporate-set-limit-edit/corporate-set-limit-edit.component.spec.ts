import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateSetLimitEditComponent } from './corporate-set-limit-edit.component';

describe('CorporateSetLimitEditComponent', () => {
  let component: CorporateSetLimitEditComponent;
  let fixture: ComponentFixture<CorporateSetLimitEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateSetLimitEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateSetLimitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
