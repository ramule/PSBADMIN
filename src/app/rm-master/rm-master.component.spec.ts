import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmMasterComponent } from './rm-master.component';

describe('RmMasterComponent', () => {
  let component: RmMasterComponent;
  let fixture: ComponentFixture<RmMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
