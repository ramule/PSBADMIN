import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsIfscCodesAddComponent } from './imps-ifsc-codes-add.component';

describe('ImpsIfscCodesAddComponent', () => {
  let component: ImpsIfscCodesAddComponent;
  let fixture: ComponentFixture<ImpsIfscCodesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsIfscCodesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsIfscCodesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
