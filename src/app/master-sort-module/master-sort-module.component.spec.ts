import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterSortModuleComponent } from './master-sort-module.component';

describe('MasterSortModuleComponent', () => {
  let component: MasterSortModuleComponent;
  let fixture: ComponentFixture<MasterSortModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSortModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSortModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
