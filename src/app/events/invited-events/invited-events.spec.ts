import { ComponentFixture, TestBed } from '@angular/core/testing';

import {UserEventsComponent } from './invited-events';

describe('InvitedEvents', () => {
  let component: UserEventsComponent;
  let fixture: ComponentFixture<UserEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
