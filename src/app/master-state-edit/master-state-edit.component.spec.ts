import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterStateEditComponent } from './master-state-edit.component';

describe('MasterStateEditComponent', () => {
  let component: MasterStateEditComponent;
  let fixture: ComponentFixture<MasterStateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterStateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterStateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
