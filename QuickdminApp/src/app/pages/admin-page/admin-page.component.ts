import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EntityRoutes } from 'src/app/routing/entity-routes';
import { ClientSettings } from 'src/settings/client.settings';
import { AuthenticatedUserService } from 'src/app/services/authenticated-user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.sass']
})
export class AdminPageComponent {

  clientName = ClientSettings.name;
  menus = EntityRoutes.map(c => ({
    title: c.title,
    path: `${c.path}${c.hasMany ? '' : '/first'}`,
  }));

  constructor(
    private router: Router,
    private authenticatedUserService: AuthenticatedUserService
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
