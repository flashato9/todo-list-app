import { Component } from '@angular/core';
import { UserAuthenticationService } from '../services/user-authentication.service';
import { UserInterfaceService } from '../services/user-interface.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public uA: UserAuthenticationService, ui: UserInterfaceService) {}
  ngOnInit() {}
}
