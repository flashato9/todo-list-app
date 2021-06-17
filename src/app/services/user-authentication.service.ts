import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  isLoggedIn$: unknown;
  isLoggedOut$: unknown;
  constructor() {}
}
