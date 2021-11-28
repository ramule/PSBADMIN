import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCityEditComponent } from './master-city-edit.component';

describe('MasterCityEditComponent', () => {
  let component: MasterCityEditComponent;
  let fixture: ComponentFixture<MasterCityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
