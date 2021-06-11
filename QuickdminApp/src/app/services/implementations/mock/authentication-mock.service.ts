import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IAuthenticationService } from '../../interface/authentication.service.interface';
import { IAuthenticatedUser } from '../../../shared/interfaces/authenticated-user.interface';

@Injectable()
export class AuthenticationMockService implements IAuthenticationService {
  authenticate(username: string, password: string): Observable<IAuthenticatedUser> {
    return new Observable(subscriber => subscriber.next({
      isAdmin: true,
      name: 'André Montagnini',
      accessToken: 'tokenMan3ir0',
    }));
  }
}
