import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsSysLogsComponent } from './imps-sys-logs.component';

describe('ImpsSysLogsComponent', () => {
  let component: ImpsSysLogsComponent;
  let fixture: ComponentFixture<ImpsSysLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsSysLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsSysLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
