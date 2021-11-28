import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCustomizeMenuComponent } from './master-customize-menu.component';

describe('MasterCustomizeMenuComponent', () => {
  let component: MasterCustomizeMenuComponent;
  let fixture: ComponentFixture<MasterCustomizeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCustomizeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCustomizeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
