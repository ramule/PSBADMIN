import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWalletPointsComponent } from './admin-wallet-points.component';

describe('AdminWalletPointsComponent', () => {
  let component: AdminWalletPointsComponent;
  let fixture: ComponentFixture<AdminWalletPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWalletPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWalletPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
