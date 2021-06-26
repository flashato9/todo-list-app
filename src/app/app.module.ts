import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Add Amplify imports */
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { AppComponent } from './app-component/app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationComponent } from './Authentication/authentication/authentication.component';
import { BaseAuthenticationComponent } from './Authentication/base-components-and-functions/base-authentication/base-authentication.component';
import { FormControlErrorsComponent } from './Authentication/base-components-and-functions/form-control-errors/form-control-errors.component';
import { LogInMenuComponent } from './Authentication/log-in-menu/log-in-menu.component';
import { RecoveryMenuComponent } from './Authentication/recovery-menu/recovery-menu.component';
import { SignUpMenuComponent } from './Authentication/sign-up-menu/sign-up-menu.component';
import { SignupConfirmationComponent } from './Authentication/sign-up-menu/signup-confirmation/signup-confirmation.component';
import { LoadingComponent } from './global-ui/loading/loading.component';
import { CreateTodoListFormComponent } from './header/create-todo-list-form/create-todo-list-form.component';
import { HeaderComponent } from './header/header/header.component';
import { ListItemComponent } from './main/list-item/list-item.component';
import { MainComponent } from './main/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogInMenuComponent,
    CreateTodoListFormComponent,
    MainComponent,
    ListItemComponent,
    AuthenticationComponent,
    SignUpMenuComponent,
    RecoveryMenuComponent,
    BaseAuthenticationComponent,
    SignupConfirmationComponent,
    FormControlErrorsComponent,
    LoadingComponent,
  ],
  imports: [
    AmplifyUIAngularModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
