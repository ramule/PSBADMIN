import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMenuEditComponent } from './master-menu-edit.component';

describe('MasterMenuEditComponent', () => {
  let component: MasterMenuEditComponent;
  let fixture: ComponentFixture<MasterMenuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterMenuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterMenuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
