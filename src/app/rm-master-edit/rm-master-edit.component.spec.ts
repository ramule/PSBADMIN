import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmMasterEditComponent } from './rm-master-edit.component';

describe('RmMasterEditComponent', () => {
  let component: RmMasterEditComponent;
  let fixture: ComponentFixture<RmMasterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmMasterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmMasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
