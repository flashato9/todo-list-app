import Auth, { CognitoUser } from '@aws-amplify/auth';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export class UserAuthenticationService {
  protected LoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.LoggedIn$.asObservable();
  isLoggedOut$ = this.isLoggedIn$.pipe(map((val) => !val));

  protected cognitoUser!: CognitoUser;

  protected performingBlockingAsyncCall$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isPerformingBlockingAsyncCall$ = this.performingBlockingAsyncCall$.asObservable();

  constructor() {}
  protected letItBeKnownLoggedIn() {
    this.LoggedIn$.next(true);
  }
  protected letItBeKnownLoggedOut() {
    this.LoggedIn$.next(false);
  }
  async signOutUser() {
    try {
      this.setPerformingBlockingAsyncCall();
      await Auth.signOut();
      this.letItBeKnownLoggedOut();
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  async checkIfSessionIsActive() {
    try {
      this.cognitoUser = await Auth.currentAuthenticatedUser();
      console.log('User is currently logged in.', this.cognitoUser);
      this.letItBeKnownLoggedIn();
    } catch (error) {
      console.log('Error getting the current authenticated user', error);
      this.letItBeKnownLoggedOut();
    }
  }
  async signInUser(username: string, password: string) {
    try {
      this.setPerformingBlockingAsyncCall();
      const user = await Auth.signIn(username, password);
      this.cognitoUser = user;
      this.letItBeKnownLoggedIn();
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  async sendForgotPasswordCode(username: string) {
    try {
      this.setPerformingBlockingAsyncCall();
      await Auth.forgotPassword(username);
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  async createNewPassword(username: string, confirmationCode: string, password: string) {
    try {
      this.setPerformingBlockingAsyncCall();
      await Auth.forgotPasswordSubmit(username, confirmationCode, password);
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  async createAccount(config: SignUpParams) {
    try {
      this.setPerformingBlockingAsyncCall();
      await Auth.signUp(config);
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  async resendSignUpCode(username: string) {
    try {
      this.setPerformingBlockingAsyncCall();
      await Auth.resendSignUp(username);
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  async confirmSignUp(username: string, confirmationCode: string) {
    try {
      this.setPerformingBlockingAsyncCall();
      await Auth.confirmSignUp(username, confirmationCode);
      await this.checkIfSessionIsActive();
      this.letItBeKnownLoggedIn();
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  protected setPerformingBlockingAsyncCall() {
    this.performingBlockingAsyncCall$.next(true);
  }
  protected unSetPerformingBlockingAsyncCall() {
    this.performingBlockingAsyncCall$.next(false);
  }
}
export class userAccount {
  constructor(private username: string) {}
  getUsername() {
    return this.username;
  }
}
export interface SignUpParams {
  username: string;
  password: string;
  attributes: {
    email: string;
  };
}
