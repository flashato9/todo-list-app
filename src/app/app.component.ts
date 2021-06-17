import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedIn: Observable<boolean>;
  isLoggedOut: Observable<boolean>;

  constructor() {
    //debugging
    this.isLoggedIn = of(true);
    this.isLoggedOut = this.isLoggedIn.pipe(map((val) => !val));
  }
}
