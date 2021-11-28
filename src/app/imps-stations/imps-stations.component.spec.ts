import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsStationsComponent } from './imps-stations.component';

describe('ImpsStationsComponent', () => {
  let component: ImpsStationsComponent;
  let fixture: ComponentFixture<ImpsStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
