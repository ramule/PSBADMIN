import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsTransFeeStructureComponent } from './imps-trans-fee-structure.component';

describe('ImpsTransFeeStructureComponent', () => {
  let component: ImpsTransFeeStructureComponent;
  let fixture: ComponentFixture<ImpsTransFeeStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsTransFeeStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsTransFeeStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
