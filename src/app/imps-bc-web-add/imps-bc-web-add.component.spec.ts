import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsBcWebAddComponent } from './imps-bc-web-add.component';

describe('ImpsBcWebAddComponent', () => {
  let component: ImpsBcWebAddComponent;
  let fixture: ComponentFixture<ImpsBcWebAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsBcWebAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsBcWebAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
