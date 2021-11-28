import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpUserRequestsComponent } from './corp-user-requests.component';

describe('CorpUserRequestsComponent', () => {
  let component: CorpUserRequestsComponent;
  let fixture: ComponentFixture<CorpUserRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorpUserRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorpUserRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
