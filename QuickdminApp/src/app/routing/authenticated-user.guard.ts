import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticatedUserService } from '../services/authenticated-user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticatedUserService: AuthenticatedUserService,
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
