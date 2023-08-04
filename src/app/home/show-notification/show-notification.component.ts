import { Component } from '@angular/core';
import { FireNotificationService } from '../../services/fire-notification.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-notification',
  templateUrl: './show-notification.component.html',
  styleUrls: ['./show-notification.component.scss']
})
export class ShowNotificationComponent {
  reminderData = {}
  notifySubscription: Subscription;
  isNotification = false;

  constructor(public fireNotificationService: FireNotificationService, private router: Router) {
  }

  ngOnInit() {
    if (this.fireNotificationService.currentReminder) {
      this.reminderData = this.fireNotificationService.currentReminder;
    }
    this.notifySubscription = this.fireNotificationService.notify$.subscribe((value) => {
      this.isNotification = value;
      if (!this.isNotification) {
        this.closeModal();
      }
    });
  }

  closeModal() {
    const currentUrl = this.fireNotificationService.currentUrl;
    this.fireNotificationService.stopAudio();
    this.router.navigate([currentUrl]);
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.notifySubscription.unsubscribe();
  }
}
