import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-log-in-menu',
  templateUrl: './log-in-menu.component.html',
  styleUrls: ['./log-in-menu.component.scss'],
})
export class LogInMenuComponent implements OnInit {
  closeDialog: boolean;
  constructor(public uA: UserAuthenticationService) {
    this.closeDialog = false;
  }

  ngOnInit(): void {}
  authAnonymous() {
    firebase
      .auth()
      .signInAnonymously()
      .then((user) => {
        console.log('✔️User Sucessfully Signed In...');
        this.uA.changeLoggedInState(true, user);
        this.closeDialog = true;
        console.log('User data:', user);
      })
      .catch((reason) => {
        console.log('❌AS1: User was not able to sign In...\n', reason);
        this.uA.changeLoggedInState(false, undefined);
      });
  }
}
