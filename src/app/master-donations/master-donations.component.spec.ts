import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDonationsComponent } from './master-donations.component';

describe('MasterDonationsComponent', () => {
  let component: MasterDonationsComponent;
  let fixture: ComponentFixture<MasterDonationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterDonationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
