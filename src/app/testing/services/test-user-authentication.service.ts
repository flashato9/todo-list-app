import { CognitoUser } from 'amazon-cognito-identity-js';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SignUpParams, UserAuthenticationService } from 'src/app/services/user-authentication/user-authentication.service';

export class TestUserAuthenticationService extends UserAuthenticationService implements UserAuthenticationService {
  protected LoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.LoggedIn$.asObservable();
  isLoggedOut$ = this.isLoggedIn$.pipe(map((val) => !val));

  constructor() {
    super();
  }

  protected cognitoUser!: CognitoUser;

  protected performingBlockingAsyncCall$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isPerformingBlockingAsyncCall$ = this.performingBlockingAsyncCall$.asObservable();

  async signOutUser() {
    try {
      this.setPerformingBlockingAsyncCall();
      this.letItBeKnownLoggedOut();
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  async checkIfSessionIsActive() {
    try {
      this.setPerformingBlockingAsyncCall();
      this.letItBeKnownLoggedIn();
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  async signInUser(username: string, password: string) {
    try {
      this.setPerformingBlockingAsyncCall();
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

      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  async createNewPassword(username: string, confirmationCode: string, password: string) {
    try {
      this.setPerformingBlockingAsyncCall();
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  async createAccount(config: SignUpParams) {
    try {
      this.setPerformingBlockingAsyncCall();
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  async resendSignUpCode(username: string) {
    try {
      this.setPerformingBlockingAsyncCall();
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  async confirmSignUp(username: string, confirmationCode: string) {
    try {
      this.setPerformingBlockingAsyncCall();
      this.letItBeKnownLoggedIn();
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
}
