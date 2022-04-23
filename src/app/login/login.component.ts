import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './../services/api.service';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formInvalid: boolean = false;
  jwt!: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private apiService: ApiService,
    private cookieService: CookieService
  ) {}

  userLoginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  onLogin() {
    if (this.userLoginForm.valid) {
      this.formInvalid = false;
      this.apiService.loginUser(this.userLoginForm.value).subscribe(
        (response) => {
          if (response.status == 'success') {
            this.formInvalid = false;
            this.jwt = response.token;
          } else {
            this.userLoginForm.reset();
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
            this.userLoginForm.reset();
            this.formInvalid = true;
            return;
          }
        }
      );
    } else {
      this.formInvalid = true;
    }
  }

  onCancelLogin() {
    this.userService.user = undefined;
    this.router.navigate(['/']);
  }
}
