import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRemindersComponent } from './create-reminders.component';

describe('CreateRemindersComponent', () => {
  let component: CreateRemindersComponent;
  let fixture: ComponentFixture<CreateRemindersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRemindersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
