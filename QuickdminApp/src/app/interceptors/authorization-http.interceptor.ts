import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthenticatedUserService } from '../services/implementations/common/authenticated-user.service';

@Injectable()
export class AuthorizationHttpInterceptor implements HttpInterceptor {

  constructor(private authenticatedUserService: AuthenticatedUserService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userAccessToken = this.authenticatedUserService.getAccessToken();
    if(userAccessToken)
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userAccessToken}`,
        }
      });
  
    return next.handle(request);
  }
}
