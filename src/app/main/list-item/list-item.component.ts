import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import {
  CreateTodoDialogData,
  CreateTodoListFormComponent,
} from 'src/app/main-submission/create-todo-list-form/create-todo-list-form.component';
import { TodoListItem } from 'src/app/services/http-todo.service';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  private _descriptionShouldBeShowing: boolean = false;
  private _currentlyUpdatingItem: boolean = false;

  @Input() listItemData: TodoListItem = { id: -1, title: '', description: '' };
  @Output() delete = new EventEmitter<TodoListItem>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  get title(): string {
    return this.listItemData.title;
  }
  get descriptionShouldBeShowing() {
    return this._descriptionShouldBeShowing;
  }
  set descriptionShouldBeShowing(value: boolean) {
    this._descriptionShouldBeShowing = value;
  }
  get descriptionParagraphData(): string[] {
    return this.listItemData.description.split('\n');
    //TODO: override angular material typography to show serif and sansserif
    //instead of roboto
  }
  get currentlyUpdatingItem() {
    return this._currentlyUpdatingItem;
  }
  set currentlyUpdatingItem(value: boolean) {
    this._currentlyUpdatingItem = value;
  }
  openUpdateWindow() {
    this.currentlyUpdatingItem = true;
    const d_data: CreateTodoDialogData = { thisIsACreateForm: false, thisIsAnUpdateForm: true, todoItem: this.listItemData };
    const dialogRef = this.dialog.open(CreateTodoListFormComponent, {
      width: '100%',
      height: '80vh',
      panelClass: 'dialog-box-create',
      autoFocus: true,
      disableClose: true,
      data: d_data,
    });
    //TODO: rename the add/update compoent to add/updateXdialog
    dialogRef
      .afterOpened()
      .pipe(take(1))
      .subscribe((result) => {
        console.log(`Dialog CreateTodoListFormComponent has opened...`);
      });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        console.log(`Dialog CreateTodoListFormComponent has closed...`);
        this.currentlyUpdatingItem = !this.currentlyUpdatingItem;
      });
  }
  deleteLItem() {
    this.delete.emit(this.listItemData);
  }
}
