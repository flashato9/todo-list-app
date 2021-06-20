import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthenticationComponent } from 'src/app/Authentication/authentication/authentication.component';
import { LogInMenuComponent } from 'src/app/Authentication/log-in-menu/log-in-menu.component';
import {
  CreateTodoDialogData,
  CreateTodoListFormComponent,
} from 'src/app/main-submission/create-todo-list-form/create-todo-list-form.component';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
  isLoggedOut: Observable<boolean>;
  constructor(public uA: UserAuthenticationService, public dialog: MatDialog) {
    //Below is initialization for testing purposes.
    this.isLoggedIn = of(true);
    this.isLoggedOut = this.isLoggedIn.pipe(map((val) => !val));
  }
  //
  ngOnInit(): void {}
  openCreationWindow() {
    const d_data: CreateTodoDialogData = {
      thisIsACreateForm: true,
      thisIsAnUpdateForm: false,
      todoItem: { id: -1, title: '', description: '' },
    };
    const dialogRef = this.dialog.open(CreateTodoListFormComponent, {
      width: '100%',
      height: '80vh',
      panelClass: 'dialog-box-create',

      disableClose: true,
      data: d_data,
    });
    this.logTheDialog(dialogRef);
  }
  logOff() {
    //fake implemenetaion
    console.log('Logged off');
    this.isLoggedIn = of(false);
    this.isLoggedOut = this.isLoggedIn.pipe(map((val) => !val));
  }
  openAuthenticationMenu() {
    const dialogRef = this.dialog.open(AuthenticationComponent, {
      width: '100%',
      height: '80vh',
      panelClass: 'dialog-box-login',
      disableClose: true,
    });
    this.logTheDialog(dialogRef);
  }
  logTheDialog<T, R>(dR: MatDialogRef<T, R>) {
    dR.afterOpened()
      .pipe(take(1))
      .subscribe(() => {
        console.log(`Dialog AuthenticationComponent has opened...`);
      });
    dR.afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        console.log(`Dialog AuthenticationComponent has closed...`);
      });
  }
}
