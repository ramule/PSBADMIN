import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsStationsEditComponent } from './imps-stations-edit.component';

describe('ImpsStationsEditComponent', () => {
  let component: ImpsStationsEditComponent;
  let fixture: ComponentFixture<ImpsStationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsStationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsStationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
