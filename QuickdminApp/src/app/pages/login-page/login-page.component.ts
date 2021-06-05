import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationApiService } from 'src/app/services/authentication-api.service';
import { AuthenticatedUserService } from 'src/app/services/authenticated-user.service';
import { HttpHelper } from 'src/app/helpers/http.helper';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent {

  loading = false;
  errorMessage: string = '';
  loginModel = { email: '', password: '' };
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(this.loginModel.email, [Validators.required, Validators.email ]),
    password: new FormControl(this.loginModel.password, [Validators.required ]),
  });

  constructor(
    private router: Router,
    private authenticatedUserService: AuthenticatedUserService,
    private authenticationApiService: AuthenticationApiService,
  ) { }

  onSubmit() {
    this.loading = true;
    this.errorMessage = '';
    const formData = this.loginForm.value;
    this.authenticationApiService
      .authenticate(formData.email, formData.password)
      .subscribe(
        (authenticatedUser) => {
          this.authenticatedUserService.setAuthenticatedUser(authenticatedUser);
          this.router.navigateByUrl('/');
          this.loading = false;
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          const defaultErrorMessage = HttpHelper.getStatusMessage(error.status);
          this.errorMessage = error.status === 400 ? 'Login inválido.' : defaultErrorMessage;
        });
  }

  showFormControlError(formControlKey: string): boolean | undefined {
    const formControl = this.loginForm.get(formControlKey)!;
    return formControl.invalid && (formControl.dirty || formControl.touched)
  }

}
