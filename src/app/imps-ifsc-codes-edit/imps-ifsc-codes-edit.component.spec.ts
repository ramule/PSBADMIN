import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsIfscCodesEditComponent } from './imps-ifsc-codes-edit.component';

describe('ImpsIfscCodesEditComponent', () => {
  let component: ImpsIfscCodesEditComponent;
  let fixture: ComponentFixture<ImpsIfscCodesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsIfscCodesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsIfscCodesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
