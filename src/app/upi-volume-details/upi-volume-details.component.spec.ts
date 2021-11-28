import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpiVolumeDetailsComponent } from './upi-volume-details.component';

describe('UpiVolumeDetailsComponent', () => {
  let component: UpiVolumeDetailsComponent;
  let fixture: ComponentFixture<UpiVolumeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpiVolumeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpiVolumeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
