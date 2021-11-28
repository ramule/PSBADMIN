import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsMasterAddComponent } from './imps-master-add.component';

describe('ImpsMasterAddComponent', () => {
  let component: ImpsMasterAddComponent;
  let fixture: ComponentFixture<ImpsMasterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsMasterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsMasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
