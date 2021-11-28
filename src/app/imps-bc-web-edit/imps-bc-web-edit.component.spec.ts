import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsBcWebEditComponent } from './imps-bc-web-edit.component';

describe('ImpsBcWebEditComponent', () => {
  let component: ImpsBcWebEditComponent;
  let fixture: ComponentFixture<ImpsBcWebEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsBcWebEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsBcWebEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
