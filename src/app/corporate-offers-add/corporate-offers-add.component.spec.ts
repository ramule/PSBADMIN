import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateOffersAddComponent } from './corporate-offers-add.component';

describe('CorporateOffersAddComponent', () => {
  let component: CorporateOffersAddComponent;
  let fixture: ComponentFixture<CorporateOffersAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateOffersAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateOffersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
