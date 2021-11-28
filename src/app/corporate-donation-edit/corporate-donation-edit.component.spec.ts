import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateDonationEditComponent } from './corporate-donation-edit.component';

describe('CorporateDonationEditComponent', () => {
  let component: CorporateDonationEditComponent;
  let fixture: ComponentFixture<CorporateDonationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateDonationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateDonationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
