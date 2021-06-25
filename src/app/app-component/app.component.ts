import { Component } from '@angular/core';
import { UserAuthInterfaceService } from '../services/user-authentication/user-auth-interface.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public uAI: UserAuthInterfaceService) {}
  ngOnInit() {}
}
