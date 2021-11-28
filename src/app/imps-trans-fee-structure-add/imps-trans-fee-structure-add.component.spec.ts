import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsTransFeeStructureAddComponent } from './imps-trans-fee-structure-add.component';

describe('ImpsTransFeeStructureAddComponent', () => {
  let component: ImpsTransFeeStructureAddComponent;
  let fixture: ComponentFixture<ImpsTransFeeStructureAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsTransFeeStructureAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsTransFeeStructureAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
