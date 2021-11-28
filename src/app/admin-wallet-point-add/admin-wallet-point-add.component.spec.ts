import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWalletPointAddComponent } from './admin-wallet-point-add.component';

describe('AdminWalletPointAddComponent', () => {
  let component: AdminWalletPointAddComponent;
  let fixture: ComponentFixture<AdminWalletPointAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWalletPointAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWalletPointAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
