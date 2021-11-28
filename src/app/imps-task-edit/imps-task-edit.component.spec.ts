import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsTaskEditComponent } from './imps-task-edit.component';

describe('ImpsTaskEditComponent', () => {
  let component: ImpsTaskEditComponent;
  let fixture: ComponentFixture<ImpsTaskEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsTaskEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsTaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
