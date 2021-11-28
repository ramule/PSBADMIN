import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsMasterComponent } from './imps-master.component';

describe('ImpsMasterComponent', () => {
  let component: ImpsMasterComponent;
  let fixture: ComponentFixture<ImpsMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
