import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsBcRetailersEditComponent } from './imps-bc-retailers-edit.component';

describe('ImpsBcRetailersEditComponent', () => {
  let component: ImpsBcRetailersEditComponent;
  let fixture: ComponentFixture<ImpsBcRetailersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsBcRetailersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsBcRetailersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
