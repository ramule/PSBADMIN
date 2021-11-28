import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsMasterEditComponent } from './imps-master-edit.component';

describe('ImpsMasterEditComponent', () => {
  let component: ImpsMasterEditComponent;
  let fixture: ComponentFixture<ImpsMasterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsMasterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
