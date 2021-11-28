import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateMakerRequestsComponent } from './corporate-maker-requests.component';

describe('CorporateMakerRequestsComponent', () => {
  let component: CorporateMakerRequestsComponent;
  let fixture: ComponentFixture<CorporateMakerRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateMakerRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateMakerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
