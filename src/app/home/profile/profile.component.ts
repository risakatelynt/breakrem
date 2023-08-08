import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm: FormGroup;
  previousForm: FormGroup;
  imageUrl;
  isDisabled = true;
  msg = '';
  isError = false;
  loading = true;
  apiUrl = environment.imageUrl;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      profile: [''],
      username: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]]
    });
    // Store the original form values
    this.previousForm = this.profileForm.value;
    this.getProfile();
  }

  onChange(event) {
    this.msg = '';
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.startsWith('image/')) {
        this.profileForm.controls['profile'].setValue(file);
        this.onUpload();
      } else {
        this.msg = 'Only image files are allowed.';
      }
    }
  }

  onCancel() {
    // Reset the form values to the original values
    this.profileForm.setValue(this.previousForm);
    this.profileForm.disable();
    this.isDisabled = true;
  }

  onUpload() {
    this.loading = true;
    const formData = new FormData();
    formData.append('profile_picture', this.profileForm.controls['profile'].value);
    formData.append('username', this.profileForm.controls['username'].value);
    formData.append('email', this.profileForm.controls['email'].value);
    this.userService.setUserImage(formData).subscribe(
      (response) => {
        if (response['resp'] == 'success') {
          if (response['data']) {
            this.imageUrl = `${this.apiUrl}${response['data']}`;
          }
        } else if (response['resp'] == 'failed') {
          this.isError = true;
          this.msg = response['message'];
          this.imageUrl = '';
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

  onSubmit() {
    if (this.profileForm.valid) {
      this.profileForm.disable();
      this.isDisabled = true;
      this.loading = true;
      const profile = { username: this.profileForm.controls['username'].value, email: this.profileForm.controls['email'].value };
      this.userService.setUserProfile(profile).subscribe(
        (response) => {
          if (response['resp'] == 'failed') {
            this.isError = true;
            this.msg = response['message'];
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
              this.imageUrl = `${this.apiUrl}${data['profile_picture']}`;
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

  getEmailErrorMessage(control): string {
    if (control.hasError('required')) {
      return 'Please enter email';
    }
    if (control.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
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
    // Store the original form values
    this.previousForm = this.profileForm.value;
  }
}
