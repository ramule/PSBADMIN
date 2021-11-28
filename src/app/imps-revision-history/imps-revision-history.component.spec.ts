import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpsRevisionHistoryComponent } from './imps-revision-history.component';

describe('ImpsRevisionHistoryComponent', () => {
  let component: ImpsRevisionHistoryComponent;
  let fixture: ComponentFixture<ImpsRevisionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpsRevisionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpsRevisionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
