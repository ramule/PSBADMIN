import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsTaskAddComponent } from './imps-task-add.component';

describe('ImpsTaskAddComponent', () => {
  let component: ImpsTaskAddComponent;
  let fixture: ComponentFixture<ImpsTaskAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsTaskAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsTaskAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
