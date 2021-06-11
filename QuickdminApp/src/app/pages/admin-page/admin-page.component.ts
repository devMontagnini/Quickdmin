import { Router } from '@angular/router';
import { Component, Inject } from '@angular/core';
import { ModelRoutes } from '../../routing/model-routes';
import { ClientSettings } from '../../../settings/client.settings';
import { AUTHENTICATED_USER_SERVICE_TOKEN } from '../../services/constants';
import { AuthenticatedUserService } from 'src/app/services/implementations/common/authenticated-user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.sass']
})
export class AdminPageComponent {

  clientName = ClientSettings.name;
  menus = ModelRoutes.map(c => ({
    title: c.title,
    path: `${c.path}${c.hasMany ? '' : '/first'}`,
  }));

  constructor(
    private router: Router,
    @Inject(AUTHENTICATED_USER_SERVICE_TOKEN) private authenticatedUserService: AuthenticatedUserService
  ) { }

  gotoPage(url: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  }

  logout(): void {
    this.authenticatedUserService.unauthenticate();
    this.router.navigateByUrl('/login');
  }
}
