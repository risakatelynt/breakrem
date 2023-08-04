import { Component } from '@angular/core';
import { RemindersService } from '../../services/reminders.service';
import { IReminder } from 'src/app/interfaces/reminder';
import { DatePipe } from '@angular/common';
import { FireNotificationService } from 'src/app/services/fire-notification.service';

@Component({
  selector: 'app-view-reminders',
  templateUrl: './view-reminders.component.html',
  styleUrls: ['./view-reminders.component.scss'],
  providers: [DatePipe]
})
export class ViewRemindersComponent {
  msg = '';
  isError = false;
  loading = false;

  reminderList: IReminder[] = [];
  selectedId = 0;
  selectedIds: number[] = [];
  allIds: number[] = [];

  reminder = {};
  showCreateRem = false;

  constructor(private reminderService: RemindersService, private fireNotificationService: FireNotificationService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.viewReminders();
  }


  viewReminders() {
    this.loading = true;
    this.reminderService.getRemindersList().subscribe(
      (response) => {
        if (response['resp'] == 'success') {
          this.reminderList = response['data'];
          this.timeout();
          this.setAllIds();
        } else {
          this.isError = true;
          this.msg = 'An error occured. Please try again.';
          this.timeout();
        }
      },
      err => {
        console.log(err);
        this.isError = true;
        this.msg = 'An error occured. Please try again.';
        this.timeout();
      }
    );
  }

  setAllIds() {
    this.allIds = this.reminderList.map(reminder => reminder['id']);
  }

  getFormattedDate(dateTime) {
    return this.datePipe.transform(dateTime, 'dd MMM yyyy h:mm a');
  }

  timeout() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  onCheckboxChange(event: any, id: number) {
    if (event.target.checked) {
      this.selectedIds.push(id);
    } else {
      const index = this.selectedIds.indexOf(id);
      if (index !== -1) {
        this.selectedIds.splice(index, 1);
      }
    }
  }

  selectAll(event) {
    if (event.target.checked) {
      this.selectedIds = this.allIds
    } else {
      this.selectedIds = [];
    }
  }

  deleteRem(id) {
    this.reminderService.deleteReminder(id).subscribe(
      (response) => {
        if (response['resp'] == 'success') {
          this.msg = 'Deleted successfully!';
          this.fireNotificationService.viewReminders();
          this.ngOnInit();
        } else if (response['resp'] == 'failed') {
          this.isError = true;
          this.msg = response['message'];
          this.timeout();
        }
      },
      err => {
        console.log(err);
        this.isError = true;
        this.msg = 'An error occured. Please try again.';
        this.timeout();
      }
    )
  }

  deleteAll() {
    this.reminderService.deleteReminders(this.selectedIds).subscribe(
      (response) => {
        if (response['resp'] == 'success') {
          this.msg = 'Deleted successfully!';
          this.fireNotificationService.viewReminders();
          this.ngOnInit();
        } else if (response['resp'] == 'failed') {
          this.isError = true;
          this.msg = response['message'];
          this.timeout();
        }
      },
      err => {
        console.log(err);
        this.isError = true;
        this.msg = 'An error occured. Please try again.';
        this.timeout();
      }
    )
  }

  openCreateRem(data): void {
    this.loading = true;
    this.reminder = data;
    this.showCreateRem = true;
    this.timeout();
  }

  handleCreateRem(event) {
    if (event) {
      this.showCreateRem = false;
      this.ngOnInit();
    }
  }

  handleBackEvent(event) {
    this.showCreateRem = event;
  }

}

