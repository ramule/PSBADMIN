import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsBcRetailersAddComponent } from './imps-bc-retailers-add.component';

describe('ImpsBcRetailersAddComponent', () => {
  let component: ImpsBcRetailersAddComponent;
  let fixture: ComponentFixture<ImpsBcRetailersAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsBcRetailersAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsBcRetailersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
