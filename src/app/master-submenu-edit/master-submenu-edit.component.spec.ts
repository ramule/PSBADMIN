import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterSubMenuEditComponent } from './master-submenu-edit.component';


describe('MasterMenuEditComponent', () => {
  let component: MasterSubMenuEditComponent;
  let fixture: ComponentFixture<MasterSubMenuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterSubMenuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSubMenuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
