import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderIdeasComponent } from './reminder-ideas.component';

describe('ReminderIdeasComponent', () => {
  let component: ReminderIdeasComponent;
  let fixture: ComponentFixture<ReminderIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReminderIdeasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReminderIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
