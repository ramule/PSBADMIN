import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateOffersComponent } from './corporate-offers.component';

describe('CorporateOffersComponent', () => {
  let component: CorporateOffersComponent;
  let fixture: ComponentFixture<CorporateOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
