import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsBusinessCorrAddComponent } from './imps-business-corr-add.component';

describe('ImpsBusinessCorrAddComponent', () => {
  let component: ImpsBusinessCorrAddComponent;
  let fixture: ComponentFixture<ImpsBusinessCorrAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsBusinessCorrAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsBusinessCorrAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
