import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsBcWebComponent } from './imps-bc-web.component';

describe('ImpsBcWebComponent', () => {
  let component: ImpsBcWebComponent;
  let fixture: ComponentFixture<ImpsBcWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsBcWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsBcWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
