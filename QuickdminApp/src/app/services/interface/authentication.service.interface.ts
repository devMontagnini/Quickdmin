import { Observable } from 'rxjs';
import { IAuthenticatedUser } from '../../shared/interfaces/authenticated-user.interface';

export interface IAuthenticationService {
  authenticate(username: string, password: string): Observable<IAuthenticatedUser>;
}
