import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPageProComponent } from './filter-page-pro.component';

describe('FilterPageProComponent', () => {
  let component: FilterPageProComponent;
  let fixture: ComponentFixture<FilterPageProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPageProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPageProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
