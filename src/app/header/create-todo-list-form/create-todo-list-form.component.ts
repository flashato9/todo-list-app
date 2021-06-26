import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateTodoData, DatabaseContactorService, UpdateTodoData } from 'src/app/services/database-contactor.service';

@Component({
  selector: 'app-create-todo-list-form',
  templateUrl: './create-todo-list-form.component.html',
  styleUrls: ['./create-todo-list-form.component.scss'],
})
//TODO: rename all to create-or-update-form
export class CreateTodoListFormComponent implements OnInit, OnDestroy {
  thisIsACreateForm!: boolean;
  thisIsAnUpdateForm!: boolean;

  form = this.fb.group({ title: [''], description: [''] });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: CreateOrUpdateTodoDialogData,
    private fb: FormBuilder,
    public dC: DatabaseContactorService
  ) {}

  ngOnInit(): void {
    this.thisIsACreateForm = this.data.thisIsACreateForm;
    this.thisIsAnUpdateForm = this.data.thisIsAnUpdateForm;
    if (this.thisIsAnUpdateForm) {
      this.form.controls['title'].setValue(this.data.todoItem.title);
      this.form.controls['description'].setValue(this.data.todoItem.description);
    }
  }
  ngOnDestroy() {}
  async onSubmit() {
    if (this.thisIsACreateForm) {
      const username = this.data.todoItem.username;
      const title = this.form.controls['title'].value;
      const description = this.form.controls['description'].value;
      try {
        await this.dC.createNewTodo({ username: username, title: title, description: description });
      } catch (error) {
        console.log('Error occured trying to create todo list item.', error);
      }
    } else {
      const id = (<UpdateTodoData>this.data.todoItem).id;
      const username = this.data.todoItem.username;
      const title = this.form.controls['title'].value;
      const description = this.form.controls['description'].value;
      try {
        await this.dC.updateTodo({ id: id, username: username, title: title, description: description });
      } catch (error) {
        console.log('Error occured trying to update todo list item.', error);
      }
    }
  }
}

export interface CreateOrUpdateTodoDialogData {
  thisIsACreateForm: boolean;
  thisIsAnUpdateForm: boolean;
  todoItem: CreateTodoData | UpdateTodoData;
}
