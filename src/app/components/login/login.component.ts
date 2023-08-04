import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FireNotificationService } from 'src/app/services/fire-notification.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup
  msg = '';
  isError = false;
  loading = false;
  loggedIn = false;

  constructor(private formbuilder: FormBuilder, private userService: UserService, private themeService: ThemeService, private fireNotificationService: FireNotificationService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loggedIn = this.userService.getLoggedIn();
    if (this.loggedIn) {
      this.themeService.getTheme();
      this.fireNotificationService.viewReminders();
      this.router.navigate(['/home']);
    }
  }

  isInvalid(field): boolean {
    if (field) {
      if (field.invalid && (field.dirty || field.touched)) {
        return true;
      }
    }
    return false;
  }

  login() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.userService.login(this.loginForm.value).subscribe(
        (response) => {
          if (response['resp'] == 'success') {
            this.timeout();
            this.router.navigate(['home']);
          } else if (response['resp'] == 'failed') {
            this.isError = true;
            this.msg = response['message'];
            this.timeout();
          }
        },
        err => {
          console.log(err);
          this.isError = true;
          this.msg = 'An error occured. Please try again later.';
          this.timeout();
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  timeout() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
