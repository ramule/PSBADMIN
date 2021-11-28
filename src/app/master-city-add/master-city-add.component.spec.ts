import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCityAddComponent } from './master-city-add.component';

describe('MasterCityAddComponent', () => {
  let component: MasterCityAddComponent;
  let fixture: ComponentFixture<MasterCityAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCityAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
