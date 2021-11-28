import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsBusinessCorrComponent } from './imps-business-corr.component';

describe('ImpsBusinessCorrComponent', () => {
  let component: ImpsBusinessCorrComponent;
  let fixture: ComponentFixture<ImpsBusinessCorrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsBusinessCorrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsBusinessCorrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
