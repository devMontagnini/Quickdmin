import { EntityRoutes } from './entity-routes';
import { Routes, UrlSegment } from '@angular/router';
import { AuthenticatedUserGuard } from './authenticated-user.guard';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { AdminPageComponent } from '../pages/admin-page/admin-page.component';
import { SearchPageComponent } from '../pages/search-page/search-page.component';
import { DashboardPageComponent } from '../pages/dashboard-page/dashboard-page.component';

export const AppRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', component: AdminPageComponent, canActivate: [AuthenticatedUserGuard], children: [
    { path: '', component: DashboardPageComponent },
    { 
      component: SearchPageComponent,
      matcher: (url: UrlSegment[]) => {
        const someRouteMatched = EntityRoutes.some(c => c.hasMany && c.path === url[0]?.path);
        return url.length === 1 && someRouteMatched ? { consumed: url } : null;
      },
    },
  ]},
];