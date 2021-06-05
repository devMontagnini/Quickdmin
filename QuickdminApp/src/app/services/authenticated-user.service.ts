import { Injectable } from '@angular/core';
import { AuthenticatedUserModel } from '../models/authenticated-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserService {

  private readonly localStorageUserKey = 'authenticated-user';

  private _authenticatedUser?: AuthenticatedUserModel;
  get authenticatedUser(): AuthenticatedUserModel | undefined {
    if (this._authenticatedUser) {
      return this._authenticatedUser;
    }
    
    const fromLocalStorage = localStorage.getItem(this.localStorageUserKey);
    if (fromLocalStorage) {
      this._authenticatedUser = JSON.parse(fromLocalStorage);
    }

    return this._authenticatedUser;
  }

  isAuthenticated(): boolean {
    return !!this.authenticatedUser;
  }

  setAuthenticatedUser(authenticatedUser: AuthenticatedUserModel): void {
    this._authenticatedUser = authenticatedUser;
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(this._authenticatedUser));
  }

  unauthenticate(): void {
    this._authenticatedUser = undefined;
    localStorage.removeItem(this.localStorageUserKey);
  }

  getAccessToken(): string | undefined {
    return this.authenticatedUser?.accessToken;
  }

  hasAdminPermissions(): boolean {
    return this.authenticatedUser?.isAdmin === true;
  }
  
}
