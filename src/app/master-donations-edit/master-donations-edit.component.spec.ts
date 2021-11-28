import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDonationsEditComponent } from './master-donations-edit.component';

describe('MasterDonationsEditComponent', () => {
  let component: MasterDonationsEditComponent;
  let fixture: ComponentFixture<MasterDonationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterDonationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDonationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
