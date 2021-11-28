import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWalletPointsEditComponent } from './admin-wallet-points-edit.component';

describe('AdminWalletPointsEditComponent', () => {
  let component: AdminWalletPointsEditComponent;
  let fixture: ComponentFixture<AdminWalletPointsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWalletPointsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWalletPointsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
