import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthenticatedUserModel } from '../models/authenticated-user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService {

  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string): Observable<AuthenticatedUserModel> {
    const authenticateUrl = `${environment.apiBaseUrl}auth`;
    return this.httpClient.post<AuthenticatedUserModel>(authenticateUrl, { username, password });
  }
}
