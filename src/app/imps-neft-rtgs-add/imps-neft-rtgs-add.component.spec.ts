import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsNeftRtgsAddComponent } from './imps-neft-rtgs-add.component';

describe('ImpsNeftRtgsAddComponent', () => {
  let component: ImpsNeftRtgsAddComponent;
  let fixture: ComponentFixture<ImpsNeftRtgsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsNeftRtgsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsNeftRtgsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
