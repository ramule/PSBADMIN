import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsIfscCodesComponent } from './imps-ifsc-codes.component';

describe('ImpsIfscCodesComponent', () => {
  let component: ImpsIfscCodesComponent;
  let fixture: ComponentFixture<ImpsIfscCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsIfscCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsIfscCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
