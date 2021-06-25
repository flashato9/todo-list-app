import { Injectable } from '@angular/core';
import { TestUserAuthenticationService } from 'src/app/testing/services/test-user-authentication.service';
import { environment } from 'src/environments/environment';
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
