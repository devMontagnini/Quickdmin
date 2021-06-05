export class AuthenticatedUserModel{
  constructor(
    public userName: string,
    public isAdmin: boolean,
    public accessToken: string,
  ) { }
}