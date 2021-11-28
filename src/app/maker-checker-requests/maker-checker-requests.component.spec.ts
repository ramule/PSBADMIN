import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerCheckerRequestsComponent } from './maker-checker-requests.component';

describe('MakerCheckerRequestsComponent', () => {
  let component: MakerCheckerRequestsComponent;
  let fixture: ComponentFixture<MakerCheckerRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerCheckerRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerCheckerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
