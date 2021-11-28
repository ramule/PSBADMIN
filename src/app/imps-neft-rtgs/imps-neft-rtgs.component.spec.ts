import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsNeftRtgsComponent } from './imps-neft-rtgs.component';

describe('ImpsNeftRtgsComponent', () => {
  let component: ImpsNeftRtgsComponent;
  let fixture: ComponentFixture<ImpsNeftRtgsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsNeftRtgsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsNeftRtgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
