import Auth, { CognitoUser } from '@aws-amplify/auth';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInterfaceService } from '../user-interface.service';

export class UserAuthenticationService {
  private userAccount$s: BehaviorSubject<CognitoUser | undefined> = new BehaviorSubject<CognitoUser | undefined>(undefined);
  userAccount$ = this.userAccount$s.asObservable().pipe(
    map((user) => {
      if (user !== undefined) {
        return new UserAccount(user?.getUsername());
      }
      return undefined;
    })
  );
  isLoggedIn$ = this.userAccount$.pipe(map((user) => user !== undefined));
  isLoggedOut$ = this.isLoggedIn$.pipe(map((val) => !val));

  constructor(public uI: UserInterfaceService) {
    this.checkIfSessionIsActive()
      .then((result) => {
        console.log('User is currently logged in.');
      })
      .catch((error) => {
        console.log('Error getting the current authenticated user.', error);
      });
  }

  getAuthenticatedUser() {}
  async signOutUser() {
    try {
      this.setPerformingBlockingAsyncCall();
      await Auth.signOut();
      this.setUserAccount(undefined);
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  async checkIfSessionIsActive() {
    try {
      this.setPerformingBlockingAsyncCall();
      const user = await Auth.currentAuthenticatedUser();
      this.setUserAccount(user);
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  async signInUser(username: string, password: string) {
    try {
      this.setPerformingBlockingAsyncCall();
      const user = await Auth.signIn(username, password);
      this.setUserAccount(user);
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

      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  protected setPerformingBlockingAsyncCall() {
    this.uI.openLoadingComponent();
  }
  protected unSetPerformingBlockingAsyncCall() {
    this.uI.closeLoadingComponent();
  }
  protected setUserAccount(cognitoUser: CognitoUser | undefined) {
    this.userAccount$s.next(cognitoUser);
  }
}
export class UserAccount {
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
