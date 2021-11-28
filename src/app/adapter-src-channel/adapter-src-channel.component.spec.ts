import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdapterSrcChannelComponent } from './adapter-src-channel.component';

describe('AdapterSrcChannelComponent', () => {
  let component: AdapterSrcChannelComponent;
  let fixture: ComponentFixture<AdapterSrcChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdapterSrcChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdapterSrcChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
