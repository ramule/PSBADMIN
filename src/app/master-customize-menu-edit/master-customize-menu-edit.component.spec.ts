import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCustomizeMenuEditComponent } from './master-customize-menu-edit.component';

describe('MasterCustomizeMenuEditComponent', () => {
  let component: MasterCustomizeMenuEditComponent;
  let fixture: ComponentFixture<MasterCustomizeMenuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCustomizeMenuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCustomizeMenuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
