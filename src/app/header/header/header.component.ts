import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { AuthenticationComponent } from 'src/app/Authentication/authentication/authentication.component';
import {
  CreateTodoDialogData,
  CreateTodoListFormComponent,
} from 'src/app/header/create-todo-list-form/create-todo-list-form.component';
import { UserAuthInterfaceService } from 'src/app/services/user-authentication/user-auth-interface.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public uAI: UserAuthInterfaceService, public dialog: MatDialog) {
    this.uAI.exposedService.checkIfSessionIsActive();
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
  async logOff() {
    try {
      await this.uAI.exposedService.signOutUser();

      console.log('Logged off');
    } catch (error) {
      console.log('Error signing out user: ', error);
    }
  }
  openAuthenticationMenu() {
    const dialogRef = this.dialog.open(AuthenticationComponent, {
      width: '100%',
      height: '100%',
      panelClass: 'dialog-box-login',
      disableClose: true,
      autoFocus: false,
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
