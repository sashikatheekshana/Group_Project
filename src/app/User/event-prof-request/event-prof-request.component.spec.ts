import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventProfRequestComponent } from './event-prof-request.component';

describe('EventProfRequestComponent', () => {
  let component: EventProfRequestComponent;
  let fixture: ComponentFixture<EventProfRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventProfRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventProfRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
