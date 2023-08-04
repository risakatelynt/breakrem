import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loggedIn = false;
  constructor(private userService: UserService, private router: Router) {
  }
  ngOnInit(): void {
    this.loggedIn = this.userService.getLoggedIn();
    if (this.loggedIn) {
      this.router.navigate(['/home/view']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
