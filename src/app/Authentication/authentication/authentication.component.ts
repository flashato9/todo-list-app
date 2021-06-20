import { Component, OnInit } from '@angular/core';
import { User } from '../base-components/base-authentication/base-authentication.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  authenticationState: AuthState = AuthState.Login;
  readonly authState = AuthState;

  constructor() {}

  ngOnInit() {}
  setAuthenticationState(state: AuthState) {
    this.authenticationState = state;
  }
  completeAuthentication(user: User) {
    console.log('Authentication Complete:');
    console.log('User:', user);
  }
}
export enum AuthState {
  Login,
  SignUp,
  Recovery,
  SuccesfulyLoggedIn,
}
