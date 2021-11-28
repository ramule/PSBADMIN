import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateSetLimitAddComponent } from './corporate-set-limit-add.component';

describe('CorporateSetLimitAddComponent', () => {
  let component: CorporateSetLimitAddComponent;
  let fixture: ComponentFixture<CorporateSetLimitAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateSetLimitAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateSetLimitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
