import { Injectable } from '@angular/core';
import Auth from '@aws-amplify/auth';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  private LoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.LoggedIn$.asObservable();
  isLoggedOut$ = this.isLoggedIn$.pipe(map((val) => !val));
  constructor() {}
  letItBeKnownLoggedIn() {
    this.LoggedIn$.next(true);
  }
  letItBeKnownLoggedOut() {
    this.LoggedIn$.next(false);
  }
  async getAuthenticatedUser() {
    try {
      const user = await Auth.currentUserPoolUser();
      return user;
    } catch (error) {
      throw error;
    }
  }
  async signOutUser() {
    try {
      await Auth.signOut();
      this.letItBeKnownLoggedOut();
    } catch (error) {
      throw error;
    }
  }
  async checkIfSessionIsActive() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log('User is currently logged in.', user);
      this.letItBeKnownLoggedIn();
    } catch (error) {
      console.log('Error getting the current authenticated user', error);
      this.letItBeKnownLoggedOut();
    }
  }
}
