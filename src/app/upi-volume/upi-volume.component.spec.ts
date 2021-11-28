import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpiVolumeComponent } from './upi-volume.component';

describe('UpiVolumeComponent', () => {
  let component: UpiVolumeComponent;
  let fixture: ComponentFixture<UpiVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpiVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpiVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
