import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserAuthInterfaceService } from 'src/app/services/user-auth-interface.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  authenticationState: AuthState = AuthState.Login;
  readonly authState = AuthState;

  sub$d!: Subscription;
  constructor(public dialogRef: MatDialogRef<AuthenticationComponent>, public uAI: UserAuthInterfaceService) {
    this.sub$d = this.uAI.exposedService.isLoggedIn$.subscribe((value) => {
      if (value) {
        this.dialogRef.close();
      }
    });
  }

  ngOnInit() {}
  setAuthenticationState(state: AuthState) {
    this.authenticationState = state;
  }
  ngOnDestroy() {
    this.sub$d.unsubscribe();
  }
}
export enum AuthState {
  Login,
  SignUp,
  Recovery,
  SuccesfulyLoggedIn,
}
