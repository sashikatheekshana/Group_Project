import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfEditProfileComponent } from './prof-edit-profile.component';

describe('ProfEditProfileComponent', () => {
  let component: ProfEditProfileComponent;
  let fixture: ComponentFixture<ProfEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfEditProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
