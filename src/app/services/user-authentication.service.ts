import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();
  isLoggedOut$ = this.loggedInSubject.asObservable().pipe(map((val) => !val));

  private userCredentialSubject: BehaviorSubject<firebase.auth.UserCredential | undefined> = new BehaviorSubject<
    firebase.auth.UserCredential | undefined
  >(undefined);
  userCredential = this.userCredentialSubject.asObservable();

  constructor() {
    firebase.initializeApp(environment.firebase_config);
  }
  logOffUser() {
    firebase
      .auth()
      .signOut()
      .then((value) => {
        console.log('✔️ User Successfully Signed Out');
        this.changeLoggedInState(false, undefined);
      })
      .catch((reason) => {
        console.log('❌ UA2 Error Occured: User was not able to logout');
      });
  }
  changeLoggedInState(state: boolean, userCredential: firebase.auth.UserCredential | undefined) {
    this.loggedInSubject.next(state);
    this.userCredentialSubject.next(userCredential);
  }
}
export type UserCredential = firebase.auth.UserCredential;
export type User = firebase.User;
