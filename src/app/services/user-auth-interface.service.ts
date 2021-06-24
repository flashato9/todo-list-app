import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TestUserAuthenticationService } from '../testing/services/test-user-authentication.service';
import { UserAuthenticationService } from './user-authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthInterfaceService {
  exposedService: UserAuthenticationService;
  constructor() {
    if (environment.test) {
      this.exposedService = new TestUserAuthenticationService();
    } else {
      this.exposedService = new UserAuthenticationService();
    }
  }
}
