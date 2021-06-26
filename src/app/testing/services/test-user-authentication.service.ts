import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  SignUpParams,
  UserAccount,
  UserAuthenticationService,
} from 'src/app/services/user-authentication/user-authentication.service';
import { UserInterfaceService } from 'src/app/services/user-interface.service';

export class TestUserAuthenticationService extends UserAuthenticationService implements UserAuthenticationService {
  private testUserAccount$s!: BehaviorSubject<UserAccount | undefined>;
  isLoggedIn$ = this.userAccount$.pipe(map((user) => user !== undefined));
  isLoggedOut$ = this.isLoggedIn$.pipe(map((val) => !val));
  constructor(public uI: UserInterfaceService) {
    super(uI);
    this.isLoggedIn$.pipe(tap(console.log)).subscribe();
  }
  async signOutUser() {
    try {
      this.setPerformingBlockingAsyncCall();
      this.testSetUserAccount(undefined);
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  async checkIfSessionIsActive() {
    try {
      this.setPerformingBlockingAsyncCall();
      this.testUserAccount$s = new BehaviorSubject<UserAccount | undefined>(undefined);
      this.userAccount$ = this.testUserAccount$s.asObservable();
      this.testSetUserAccount(new UserAccount('dill'));
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  async signInUser(username: string, password: string) {
    try {
      this.setPerformingBlockingAsyncCall();

      this.testSetUserAccount(new UserAccount('dill'));
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
      this.testSetUserAccount(new UserAccount('dill'));
      this.unSetPerformingBlockingAsyncCall();
    } catch (error) {
      this.unSetPerformingBlockingAsyncCall();
      throw error;
    }
  }
  protected testSetUserAccount(userAccount: UserAccount | undefined) {
    this.testUserAccount$s.next(userAccount);
  }
}
