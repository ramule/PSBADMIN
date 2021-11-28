import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsTransFeeStructureEditComponent } from './imps-trans-fee-structure-edit.component';

describe('ImpsTransFeeStructureEditComponent', () => {
  let component: ImpsTransFeeStructureEditComponent;
  let fixture: ComponentFixture<ImpsTransFeeStructureEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsTransFeeStructureEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsTransFeeStructureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
