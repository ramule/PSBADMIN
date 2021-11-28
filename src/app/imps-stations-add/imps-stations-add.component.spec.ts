import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsStationsAddComponent } from './imps-stations-add.component';

describe('ImpsStationsAddComponent', () => {
  let component: ImpsStationsAddComponent;
  let fixture: ComponentFixture<ImpsStationsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsStationsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsStationsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
