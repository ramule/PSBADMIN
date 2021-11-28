import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsEcollectionComponent } from './imps-ecollection.component';

describe('ImpsEcollectionComponent', () => {
  let component: ImpsEcollectionComponent;
  let fixture: ComponentFixture<ImpsEcollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsEcollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsEcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
