import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsBusinessCorrEditComponent } from './imps-business-corr-edit.component';

describe('ImpsBusinessCorrEditComponent', () => {
  let component: ImpsBusinessCorrEditComponent;
  let fixture: ComponentFixture<ImpsBusinessCorrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsBusinessCorrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsBusinessCorrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
