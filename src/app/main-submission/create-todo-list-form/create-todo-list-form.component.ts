import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DatabaseContactorService } from 'src/app/services/database-contactor.service';
import { TodoListItem } from 'src/app/services/http-todo.service';

@Component({
  selector: 'app-create-todo-list-form',
  templateUrl: './create-todo-list-form.component.html',
  styleUrls: ['./create-todo-list-form.component.scss'],
})
//TODO: rename all to create-or-update-form
export class CreateTodoListFormComponent implements OnInit, OnDestroy {
  private _thisIsACreateForm: boolean = true;
  private _thisIsAnUpdateForm: boolean = false;

  private todoItem: TodoListItem = { id: -1, title: '', description: '' };
  form = this.fb.group({ title: [''], description: [''] });

  private subs: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: CreateTodoDialogData,
    private fb: FormBuilder,
    public dC: DatabaseContactorService
  ) {}
  get thisIsACreateForm() {
    return this._thisIsACreateForm;
  }
  set thisIsACreateForm(value: boolean) {
    this._thisIsACreateForm = value;
  }
  get thisIsAnUpdateForm() {
    return this._thisIsAnUpdateForm;
  }
  set thisIsAnUpdateForm(value: boolean) {
    this._thisIsAnUpdateForm = value;
  }
  ngOnInit(): void {
    this.thisIsACreateForm = this.data.thisIsACreateForm;
    this.thisIsAnUpdateForm = this.data.thisIsAnUpdateForm;
    this.todoItem = this.data.todoItem;
    this.form.controls['title'].setValue(this.todoItem.title);
    this.form.controls['description'].setValue(this.todoItem.description);

    this.subs.add(
      this.form.controls['title'].valueChanges
        .pipe(
          tap((result) => {
            this.todoItem.title = result;
          })
        )
        .subscribe()
    );
    this.subs.add(
      this.form.controls['description'].valueChanges
        .pipe(
          tap((result) => {
            this.todoItem.description = result;
          })
        )
        .subscribe()
    );
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  onSubmit() {
    if (this.thisIsACreateForm) {
      // this.dC.createTodoListItem(this.todoItem);
    } else {
      //   this.dC.updateTodoListItem(this.todoItem);
    }
  }
}

export interface CreateTodoDialogData {
  thisIsACreateForm: boolean;
  thisIsAnUpdateForm: boolean;
  todoItem: TodoListItem;
}
