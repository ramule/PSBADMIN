import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsTaskComponent } from './imps-task.component';

describe('ImpsTaskComponent', () => {
  let component: ImpsTaskComponent;
  let fixture: ComponentFixture<ImpsTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
