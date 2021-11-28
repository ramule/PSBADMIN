import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezeUnfreezeAccountComponent } from './freeze-unfreeze-account.component';

describe('FreezeUnfreezeAccountComponent', () => {
  let component: FreezeUnfreezeAccountComponent;
  let fixture: ComponentFixture<FreezeUnfreezeAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreezeUnfreezeAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreezeUnfreezeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
