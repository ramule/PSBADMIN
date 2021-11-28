import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLocationEditComponent } from './master-location-edit.component';

describe('MasterLocationEditComponent', () => {
  let component: MasterLocationEditComponent;
  let fixture: ComponentFixture<MasterLocationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLocationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLocationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
