import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerRequestsComponent } from './maker-requests.component';

describe('MakerRequestsComponent', () => {
  let component: MakerRequestsComponent;
  let fixture: ComponentFixture<MakerRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
