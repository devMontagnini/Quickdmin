import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IAuthenticationService } from '../../interface/authentication.service.interface';
import { IAuthenticatedUser } from '../../../shared/interfaces/authenticated-user.interface';

@Injectable()
export class AuthenticationApiService implements IAuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string): Observable<IAuthenticatedUser> {
    const authenticateUrl = `${environment.apiBaseUrl}auth`;
    return this.httpClient.post<IAuthenticatedUser>(authenticateUrl, { username, password });
  }
}
