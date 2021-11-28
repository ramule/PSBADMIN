import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdapterSrcChannelEditComponent } from './adapter-src-channel-edit.component';

describe('AdapterSrcChannelEditComponent', () => {
  let component: AdapterSrcChannelEditComponent;
  let fixture: ComponentFixture<AdapterSrcChannelEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdapterSrcChannelEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdapterSrcChannelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
