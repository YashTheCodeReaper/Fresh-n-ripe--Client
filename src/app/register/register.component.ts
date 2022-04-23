import { UserService } from './../services/user.service';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  emailExists: boolean = false;
  emailInvalid: boolean = false;
  formInvalid: boolean = false;
  passwordInvalid: boolean = false;
  confirmPasswordInValid: boolean = false;
  jwt!: string;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  userRegisterForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    picture: new FormControl(
      'https://www.kindpng.com/picc/b/78-786207_avatar-png-icon.png',
      Validators.required
    ),
    password: new FormControl('', Validators.required),
    doorno: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    locality: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    pincode: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  onCancelRegister() {
    this.router.navigate(['/']);
  }

  checkEmailExistance(event: any) {
    if (
      event.target.value
        .toString()
        .match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      this.emailInvalid = false;
    this.apiService
      .checkEmailExistance(event.target.value)
      .subscribe((response) => {
        if (response.data.length === 0) {
          this.emailExists = false;
        } else {
          this.emailExists = true;
        }
      });
  }

  onRegister() {
    if (
      this.userRegisterForm.value.email
        .toString()
        .match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      this.emailInvalid = false;
      this.formInvalid = false;
    } else {
      this.emailInvalid = true;
      this.formInvalid = true;
    }
    if (
      this.userRegisterForm.value.password
        .toString()
        .match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    ) {
      this.passwordInvalid = false;
      this.formInvalid = false;
      if (
        this.userRegisterForm.value.password ==
        this.userRegisterForm.value.confirmPassword
      ) {
        this.confirmPasswordInValid = false;
        this.formInvalid = false;
      } else {
        this.confirmPasswordInValid = true;
        this.formInvalid = true;
      }
    } else {
      this.passwordInvalid = true;
      this.formInvalid = true;
    }

    if (this.userRegisterForm.invalid) {
      this.formInvalid = true;
    } else {
      this.formInvalid = false;
      if (
        !this.emailExists &&
        !this.emailInvalid &&
        !this.formInvalid &&
        !this.passwordInvalid &&
        !this.confirmPasswordInValid
      ) {
        this.apiService.registerUser(this.userRegisterForm.value).subscribe(
          (response) => {
            if (response.status == 'success') {
              this.formInvalid = false;
              this.jwt = response.token;
            } else {
              this.formInvalid = true;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            if (this.jwt) {
              this.cookieService.set('jwt', this.jwt, 1);
              this.userService.validateLogin();
              this.router.navigate(['/redirector']);
            } else {
              this.userRegisterForm.reset();
              this.formInvalid = true;
              return;
            }
          }
        );
      }
    }
  }
}
