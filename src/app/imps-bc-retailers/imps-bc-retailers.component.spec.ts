import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsBcRetailersComponent } from './imps-bc-retailers.component';

describe('ImpsBcRetailersComponent', () => {
  let component: ImpsBcRetailersComponent;
  let fixture: ComponentFixture<ImpsBcRetailersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsBcRetailersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsBcRetailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
