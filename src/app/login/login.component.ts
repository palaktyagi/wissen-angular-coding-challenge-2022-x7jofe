import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
/**
 * Modify the login component and the login template to collect login details and add the validators as necessary
 */
import { AuthenticationService } from '../services/authentication.service';
import { catchError, filter, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { logo } from '../../assets/logo.const';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  logo;
  showPass = false;

  constructor(
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.logo = this.sanitizer.bypassSecurityTrustResourceUrl(logo);

    // setup the loginform and validators
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  togglePassword() {
    this.showPass = !this.showPass;
  }

  nextMethod(username, password) {
    const payload = {
      email: username,
      password: password,
    };

    this.authenticationService
      .login(payload)
      .pipe(
        tap((res) => {
          if (res.token) {
            this.saveTokenAndRedirect(res.token);
            this.toaster.success('Successfully Logged in');
          }
        }),
        catchError((err) => {
          console.log(err);
          return of(undefined);
        }),
        filter((res) => !!res)
      )
      .subscribe();
  }

  ngOnDestroy() {}

  // onSubmit() {
  //   //
  // }

  usernameValidator(formControl: FormControl) {
    const value = formControl.value;
    const check = /^[a-zA-Z]*$/.test(value);
    return check && value.length > 6 ? false : { username: true };
  }

  // implement the password validator
  // Min 1 uppercase, 1 lower case and a digit. Total length >= 8
  passwordValidator(formControl: FormControl) {
    // const password = formControl.value;
    // const check = /^(?=.?[A-Z])(?=.?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{8, 20}/.test(password);
    // return check ? false : {password: true};
  }

  saveTokenAndRedirect(token) {
    this.authenticationService.setAuthToken(token);
    this.router.navigate(['welcome']);
  }
}
