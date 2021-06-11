import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { AUTHENTICATED_USER_SERVICE_TOKEN } from '../services/constants';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { IAuthenticatedUserService } from '../services/interface/authenticated-user.service.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(AUTHENTICATED_USER_SERVICE_TOKEN) private authenticatedUserService: IAuthenticatedUserService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authenticatedUserService.isAuthenticated();
    if(!isAuthenticated) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
  
}
