import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { AuthenticationComponent } from 'src/app/Authentication/authentication/authentication.component';
import {
  CreateOrUpdateTodoDialogData,
  CreateTodoListFormComponent,
} from 'src/app/header/create-todo-list-form/create-todo-list-form.component';
import { UserAuthInterfaceService } from 'src/app/services/user-authentication/user-auth-interface.service';
import { logTheDialog } from 'src/app/services/user-interface.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public uAI: UserAuthInterfaceService, public dialog: MatDialog) {}
  //
  ngOnInit(): void {}
  async openCreationWindow() {
    const userAccount = await this.uAI.exposedService.userAccount$.pipe(take(1)).toPromise();

    const d_data: CreateOrUpdateTodoDialogData = {
      thisIsACreateForm: true,
      thisIsAnUpdateForm: false,
      todoItem: { username: userAccount!.getUsername(), title: '', description: '' },
    };
    const dialogRef = this.dialog.open(CreateTodoListFormComponent, {
      width: '100%',
      height: '80vh',
      panelClass: 'dialog-box-create',
      disableClose: true,
      data: d_data,
    });
    logTheDialog(dialogRef, 'CreateTodoListFormComponent');
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
    logTheDialog(dialogRef, 'CreateTodoListFormComponent');
  }
}
