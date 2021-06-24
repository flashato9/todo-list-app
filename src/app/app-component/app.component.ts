import { Component } from '@angular/core';
import { UserAuthInterfaceService } from '../services/user-auth-interface.service';
import { UserInterfaceService } from '../services/user-interface.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public uAI: UserAuthInterfaceService, ui: UserInterfaceService) {}
  ngOnInit() {}
}
