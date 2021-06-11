import { Injectable } from '@angular/core';
import { IAuthenticatedUser } from '../../../shared/interfaces/authenticated-user.interface';
import { IAuthenticatedUserService } from '../../interface/authenticated-user.service.interface';

@Injectable()
export class AuthenticatedUserService implements IAuthenticatedUserService {

  private readonly localStorageUserKey = 'authenticated-user';

  private _authenticatedUser?: IAuthenticatedUser;
  get authenticatedUser(): IAuthenticatedUser | undefined {
    if (this._authenticatedUser) {
      return this._authenticatedUser;
    }
    
    const fromLocalStorage = localStorage.getItem(this.localStorageUserKey);
    if (fromLocalStorage) {
      this._authenticatedUser = JSON.parse(fromLocalStorage);
    }

    return this._authenticatedUser;
  }

  unauthenticate(): void {
    this._authenticatedUser = undefined;
    localStorage.removeItem(this.localStorageUserKey);
  }

  isAuthenticated(): boolean {
    return !!this.authenticatedUser;
  }

  hasAdminPermissions(): boolean {
    return this.authenticatedUser?.isAdmin === true;
  }

  getAccessToken(): string | undefined {
    return this.authenticatedUser?.accessToken;
  }

  setAuthenticatedUser(authenticatedUser: IAuthenticatedUser): void {
    this._authenticatedUser = authenticatedUser;
    localStorage.setItem(this.localStorageUserKey, JSON.stringify(this._authenticatedUser));
  }
}
