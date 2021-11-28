import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateOffersEditComponent } from './corporate-offers-edit.component';

describe('CorporateOffersEditComponent', () => {
  let component: CorporateOffersEditComponent;
  let fixture: ComponentFixture<CorporateOffersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateOffersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateOffersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
