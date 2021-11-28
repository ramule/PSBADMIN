import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWalletUpgradeEditComponent } from './register-wallet-upgrade-edit.component';

describe('RegisterWalletUpgradeEditComponent', () => {
  let component: RegisterWalletUpgradeEditComponent;
  let fixture: ComponentFixture<RegisterWalletUpgradeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterWalletUpgradeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterWalletUpgradeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
