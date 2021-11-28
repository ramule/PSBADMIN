import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdapterSrcIpComponent } from './adapter-src-ip.component';

describe('AdapterSrcIpComponent', () => {
  let component: AdapterSrcIpComponent;
  let fixture: ComponentFixture<AdapterSrcIpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdapterSrcIpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdapterSrcIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
