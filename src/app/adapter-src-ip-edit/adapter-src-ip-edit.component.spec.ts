import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdapterSrcIpEditComponent } from './adapter-src-ip-edit.component';

describe('AdapterSrcIpEditComponent', () => {
  let component: AdapterSrcIpEditComponent;
  let fixture: ComponentFixture<AdapterSrcIpEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdapterSrcIpEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdapterSrcIpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
