import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { AuthenticatedUserService } from '../services/authenticated-user.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class UnauthorizedHttpInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authenticatedUserService: AuthenticatedUserService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(errorResponse => {
        if (errorResponse.status === 401 || errorResponse.status === 403) {
          this.authenticatedUserService.unauthenticate();
          this.router.navigateByUrl('/login');
          return of(errorResponse);
        }
        return throwError(errorResponse);
      })
    );
  }
}
