import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsSystemConfigAddComponent } from './imps-system-config-add.component';

describe('ImpsSystemConfigAddComponent', () => {
  let component: ImpsSystemConfigAddComponent;
  let fixture: ComponentFixture<ImpsSystemConfigAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsSystemConfigAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsSystemConfigAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
