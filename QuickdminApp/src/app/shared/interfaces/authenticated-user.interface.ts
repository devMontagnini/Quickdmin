export interface IAuthenticatedUser {
  name: string;
  isAdmin: boolean;
  accessToken: string;
}