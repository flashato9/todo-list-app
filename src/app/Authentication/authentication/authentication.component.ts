import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';
import { User } from '../base-components/base-authentication/base-authentication.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  authenticationState: AuthState = AuthState.Login;
  readonly authState = AuthState;

  constructor(public dialogRef: MatDialogRef<AuthenticationComponent>, public uA: UserAuthenticationService) {}

  ngOnInit() {}
  setAuthenticationState(state: AuthState) {
    this.authenticationState = state;
  }
  completeAuthentication(user: User) {
    console.log('Authentication Complete:');
    console.log('User:', user);
    this.dialogRef.close();
    this.uA.letItBeKnownLoggedIn();
  }
}
export enum AuthState {
  Login,
  SignUp,
  Recovery,
  SuccesfulyLoggedIn,
}
