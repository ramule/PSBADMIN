import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWalletUpgradeComponent } from './register-wallet-upgrade.component';

describe('RegisterWalletUpgradeComponent', () => {
  let component: RegisterWalletUpgradeComponent;
  let fixture: ComponentFixture<RegisterWalletUpgradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterWalletUpgradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterWalletUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
