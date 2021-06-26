import { Injectable } from '@angular/core';
import { TestUserAuthenticationService } from 'src/app/testing/services/test-user-authentication.service';
import { environment } from 'src/environments/environment';
import { UserInterfaceService } from '../user-interface.service';
import { UserAuthenticationService } from './user-authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthInterfaceService {
  exposedService: UserAuthenticationService;
  constructor(private uI: UserInterfaceService) {
    if (environment.test) {
      this.exposedService = new TestUserAuthenticationService(this.uI);
    } else {
      this.exposedService = new UserAuthenticationService(this.uI);
    }
  }
}
