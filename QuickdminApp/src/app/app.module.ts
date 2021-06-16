
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RoutingModule } from './routing/routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ServicesModule } from './services/services.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DeleteDialog } from './components/delete-dialog/delete.dialog';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorBoxComponent } from './components/error-box/error-box.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ModelFormComponent } from './components/model-form/model-form.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoadingBoxComponent } from './components/loading-box/loading-box.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { UnauthorizedHttpInterceptor } from './interceptors/unauthorized-http.interceptor';
import { PageTitleComponent } from './components/page-title-component/page-title.component';
import { AuthorizationHttpInterceptor } from './interceptors/authorization-http.interceptor';
import { SimpleTextFieldComponent } from './components/model-form/fields/simple-text-field/simple-text-field.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteDialog,
    FormPageComponent,
    ErrorBoxComponent,
    ModelFormComponent,
    AdminPageComponent,
    PageTitleComponent,
    LoginPageComponent,
    SearchPageComponent,
    PaginationComponent,
    LoadingBoxComponent,
    GenericTableComponent,
    DashboardPageComponent,
    SimpleTextFieldComponent,
  ],
  imports: [
    MatCardModule,
    MatIconModule,
    BrowserModule,
    RoutingModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    HttpClientModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ServicesModule.forRoot(true),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
