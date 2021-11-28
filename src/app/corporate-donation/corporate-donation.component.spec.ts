import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDonationComponent } from './corporate-donation.component';

describe('CorporateDonationComponent', () => {
  let component: CorporateDonationComponent;
  let fixture: ComponentFixture<CorporateDonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
