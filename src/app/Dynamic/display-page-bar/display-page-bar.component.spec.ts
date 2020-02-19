import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPageBarComponent } from './display-page-bar.component';

describe('DisplayPageBarComponent', () => {
  let component: DisplayPageBarComponent;
  let fixture: ComponentFixture<DisplayPageBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPageBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
