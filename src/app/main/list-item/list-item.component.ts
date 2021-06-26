import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CreateOrUpdateTodoDialogData,
  CreateTodoListFormComponent,
} from 'src/app/header/create-todo-list-form/create-todo-list-form.component';
import { CompleteTodoData, DatabaseContactorService } from 'src/app/services/database-contactor.service';
import { logTheDialog } from 'src/app/services/user-interface.service';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  descriptionShouldBeShowing: boolean = false;
  currentlyUpdatingItem: boolean = false;

  @Input() listItemData!: CompleteTodoData;

  constructor(public dialog: MatDialog, public dC: DatabaseContactorService) {}

  ngOnInit(): void {}
  get title(): string {
    return this.listItemData.title;
  }
  get descriptionParagraphData(): string[] {
    return this.listItemData.description.split('\n');
  }
  openUpdateWindow() {
    this.currentlyUpdatingItem = true;
    const d_data: CreateOrUpdateTodoDialogData = {
      thisIsACreateForm: false,
      thisIsAnUpdateForm: true,
      todoItem: this.listItemData,
    };
    const dialogRef = this.dialog.open(CreateTodoListFormComponent, {
      width: '100%',
      height: '80vh',
      panelClass: 'dialog-box-create',
      autoFocus: true,
      disableClose: true,
      data: d_data,
    });
    //TODO: rename the add/update compoent to add/updateXdialog
    logTheDialog(dialogRef, 'CreateTodoListFormComponent');
  }
  async deleteLItem() {
    try {
      await this.dC.deleteTodo(this.listItemData);
      console.log('Successful deleting todo list item.');
    } catch (error) {
      console.log('Error deleteing todo list item.', error);
    }
  }
}
