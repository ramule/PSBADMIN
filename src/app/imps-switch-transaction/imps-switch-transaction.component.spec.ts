import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsSwitchTransactionComponent } from './imps-switch-transaction.component';

describe('ImpsSwitchTransactionComponent', () => {
  let component: ImpsSwitchTransactionComponent;
  let fixture: ComponentFixture<ImpsSwitchTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsSwitchTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsSwitchTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
