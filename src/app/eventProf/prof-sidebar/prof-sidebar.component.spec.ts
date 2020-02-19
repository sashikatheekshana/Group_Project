import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfSidebarComponent } from './prof-sidebar.component';

describe('ProfSidebarComponent', () => {
  let component: ProfSidebarComponent;
  let fixture: ComponentFixture<ProfSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
