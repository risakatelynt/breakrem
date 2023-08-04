import { Component } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm: FormGroup;
  imageUrl;
  isDisabled = true;
  msg = '';
  isError = false;
  loading = true;
  DJANGO_SERVER = 'http://127.0.0.1:8000'

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      profile: [''],
      username: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }]
    });
    this.getProfile();
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.controls['profile'].setValue(file);
      this.onSubmit();
    }
  }

  onSubmit() {
    this.profileForm.disable();
    this.isDisabled = true;
    this.loading = true;
    const formData = new FormData();
    formData.append('profile_picture', this.profileForm.controls['profile'].value);
    formData.append('username', this.profileForm.controls['username'].value);
    formData.append('email', this.profileForm.controls['email'].value);
    this.userService.setUserProfile(formData).subscribe(
      (response) => {
        if (response['resp'] == 'success') {
          if (response['data']) {
            this.imageUrl = `${this.DJANGO_SERVER}${response['data']}`;
          }
        } else if (response['resp'] == 'failed') {
          this.isError = true;
          this.msg = response['message'];
          this.imageUrl = '';
        } else {
          this.isError = true;
          this.imageUrl = '';
          this.isError = true;
          this.msg = 'An error occured while uploading image. Please try again later.'
        }
        this.timeout();
      },
      err => {
        console.log(err);
        this.isError = true;
        this.msg = 'An error occured. Please try again.';
        this.timeout();
      }
    );
  }

  getProfile() {
    this.loading = true;
    this.userService.getUserProfile().subscribe(
      (response) => {
        if (response['resp'] == 'success') {
          if (response['data']) {
            const data = response['data'];
            this.profileForm.controls['username'].setValue(data['username']);
            this.profileForm.controls['email'].setValue(data['email']);
            if (data['profile_picture']) {
              this.imageUrl = `${this.DJANGO_SERVER}${data['profile_picture']}`;
              this.profileForm.controls['profile'].setValue(data['profile_picture']);
            } else {
              this.imageUrl = '';
            }
          }
        } else if (response['resp'] == 'failed') {
          this.isError = true;
          this.msg = response['message'];
          this.imageUrl = '';
        } else {
          this.isError = true;
          this.imageUrl = '';
          this.msg = 'An error occured while loading image. Please try again later.'
        }
        this.timeout();
      },
      err => {
        console.log(err);
        this.isError = true;
        this.msg = 'An error occured. Please try again.';
        this.imageUrl = '';
        this.timeout();
      }
    );
  }

  timeout() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  isInvalid(field): boolean {
    if (field) {
      if (field.invalid && (field.dirty || field.touched)) {
        return true;
      }
    }
    return false;
  }

  edit() {
    this.profileForm.enable();
    this.isDisabled = false;
  }
}
