import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsEcollectionAddComponent } from './imps-ecollection-add.component';

describe('ImpsEcollectionAddComponent', () => {
  let component: ImpsEcollectionAddComponent;
  let fixture: ComponentFixture<ImpsEcollectionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsEcollectionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsEcollectionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
