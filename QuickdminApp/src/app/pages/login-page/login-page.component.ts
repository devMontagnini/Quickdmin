import { Router } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpHelper } from '../../services/implementations/api/helpers/http.helper';
import { IAuthenticationService } from '../../services/interface/authentication.service.interface';
import { IAuthenticatedUserService } from '../../services/interface/authenticated-user.service.interface';
import { AUTHENTICATED_USER_SERVICE_TOKEN, AUTHENTICATION_SERVICE_TOKEN } from '../../services/constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent {

  loading = false;
  errorMessage: string = '';
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email ]),
    password: new FormControl(null, [Validators.required ]),
  });

  constructor(
    private router: Router,
    @Inject(AUTHENTICATION_SERVICE_TOKEN) private authenticationApiService: IAuthenticationService,
    @Inject(AUTHENTICATED_USER_SERVICE_TOKEN) private authenticatedUserService: IAuthenticatedUserService,
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
