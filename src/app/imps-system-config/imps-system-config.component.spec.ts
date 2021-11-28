import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsSystemConfigComponent } from './imps-system-config.component';

describe('ImpsSystemConfigComponent', () => {
  let component: ImpsSystemConfigComponent;
  let fixture: ComponentFixture<ImpsSystemConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsSystemConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsSystemConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
