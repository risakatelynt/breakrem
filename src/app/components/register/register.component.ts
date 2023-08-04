import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  signUpForm!: FormGroup;
  msg = '';
  isError = false;
  loading = false;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  isInvalid(field): boolean {
    if (field) {
      if (field.invalid && (field.dirty || field.touched)) {
        return true;
      }
    }
    return false;
  }

  signUp() {
    if (this.signUpForm.valid) {
      this.loading = true;
      this.userService.signup(this.signUpForm.value).subscribe(
        (response) => {
          if (response['resp'] == 'success') {
            this.router.navigate(['/home']);
          } else if (response['resp'] == 'failed') {
            this.isError = true;
            this.msg = response['message'];
            this.timeout();
          }
        },
        err => {
          this.msg = 'An error occured. Please try again later.';
          console.log(err);
          this.isError = true;
          this.timeout();
        }
      );
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

  timeout() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

}
