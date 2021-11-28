import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterStateAddComponent } from './master-state-add.component';

describe('MasterStateAddComponent', () => {
  let component: MasterStateAddComponent;
  let fixture: ComponentFixture<MasterStateAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterStateAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterStateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
