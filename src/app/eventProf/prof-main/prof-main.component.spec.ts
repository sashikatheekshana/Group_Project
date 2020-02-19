import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfMainComponent } from './prof-main.component';

describe('ProfMainComponent', () => {
  let component: ProfMainComponent;
  let fixture: ComponentFixture<ProfMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
