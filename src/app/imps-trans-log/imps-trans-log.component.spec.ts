import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsTransLogComponent } from './imps-trans-log.component';

describe('ImpsTransLogComponent', () => {
  let component: ImpsTransLogComponent;
  let fixture: ComponentFixture<ImpsTransLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsTransLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsTransLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
