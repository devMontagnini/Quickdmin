import { IAuthenticatedUser } from "../../shared/interfaces/authenticated-user.interface";

export interface IAuthenticatedUserService {

  readonly authenticatedUser: IAuthenticatedUser | undefined;

  unauthenticate(): void;

  isAuthenticated(): boolean;

  hasAdminPermissions(): boolean;

  getAccessToken(): string | undefined;

  setAuthenticatedUser(authenticatedUser: IAuthenticatedUser): void;
  
}
