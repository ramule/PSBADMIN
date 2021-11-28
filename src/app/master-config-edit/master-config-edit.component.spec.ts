import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterConfigEditComponent } from './master-config-edit.component';

describe('MasterConfigEditComponent', () => {
  let component: MasterConfigEditComponent;
  let fixture: ComponentFixture<MasterConfigEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterConfigEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterConfigEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
