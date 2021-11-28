import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsEcollectionRequestLogComponent } from './imps-ecollection-request-log.component';

describe('ImpsEcollectionRequestLogComponent', () => {
  let component: ImpsEcollectionRequestLogComponent;
  let fixture: ComponentFixture<ImpsEcollectionRequestLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsEcollectionRequestLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsEcollectionRequestLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
