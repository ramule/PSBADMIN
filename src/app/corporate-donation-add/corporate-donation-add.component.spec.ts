import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDonationAddComponent } from './corporate-donation-add.component';

describe('CorporateDonationAddComponent', () => {
  let component: CorporateDonationAddComponent;
  let fixture: ComponentFixture<CorporateDonationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDonationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDonationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
