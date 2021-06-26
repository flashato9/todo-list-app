import { Injectable } from '@angular/core';
import { GraphQLResult } from '@aws-amplify/api';
import { DataStore } from 'aws-amplify';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Todo } from 'src/models';
import { UserAuthInterfaceService } from './user-authentication/user-auth-interface.service';
@Injectable({
  providedIn: 'root',
})
export class DatabaseContactorService {
  private todoList$s: BehaviorSubject<CompleteTodoData[]> = new BehaviorSubject<CompleteTodoData[]>([]);
  todoList$ = this.todoList$s.asObservable();

  constructor(uAI: UserAuthInterfaceService) {
    uAI.exposedService.userAccount$
      .pipe(
        tap((userAccount) => {
          this.getTodosListFor(userAccount?.getUsername() || '')
            .then((result) => {
              console.log('Todo list succesfully read');
            })
            .catch((error) => {
              console.log('Error reading TodoList.', error);
            });
        })
      )
      .subscribe();
  }

  async createNewTodo(todoItemDetails: CreateTodoData) {
    const createDate = new Date().toISOString();
    try {
      const result = await DataStore.save(
        new Todo({
          username: todoItemDetails.username,
          title: todoItemDetails.title,
          description: todoItemDetails.description,
          createdAt: createDate,
          updatedAt: createDate,
        })
      );
      await this.getTodosListFor(todoItemDetails.username);
      const createdTodoItem = <CompleteTodoData>(<GraphQLResult<object>>result).data;
      return createdTodoItem;
    } catch (error) {
      throw error;
    }
  }
  private async getTodosListFor(username: string) {
    try {
      const result = await DataStore.query(Todo, (todo) => todo.username('eq', username));
      this.todoList$s.next(result);
    } catch (error) {
      throw error;
    }
  }
  async updateTodo(todoItemDetails: UpdateTodoData) {
    try {
      const todo = await this.findTodoItem(todoItemDetails.id);
      const updateDate = new Date().toISOString();
      const result: CompleteTodoData = await DataStore.save(
        Todo.copyOf(todo, (mutate) => {
          mutate.title = todoItemDetails.title;
          mutate.description = todoItemDetails.description;
          mutate.updatedAt = updateDate;
        })
      );
      await this.getTodosListFor(todoItemDetails.username);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async deleteTodo(todoItemDetails: DeleteTodoData) {
    try {
      const todo = await this.findTodoItem(todoItemDetails.id);
      const result = await DataStore.delete(todo);
      await this.getTodosListFor(todoItemDetails.username);
      return result;
    } catch (error) {
      throw error;
    }
  }
  private async findTodoItem(id: string) {
    const todoList = await this.todoList$.pipe(take(1)).toPromise();
    if (todoList.length === 0) {
      throw new Error(`todoList$ is empty. No item with id=${id}, was found.`);
    } else {
      const todo = todoList.filter((item) => item.id === id)[0];
      return todo;
    }
  }
}

export interface CreateTodoData {
  username: string;
  title: string;
  description: string;
}
export interface UpdateTodoData {
  id: string;
  username: string;
  title: string;
  description: string;
}
export interface DeleteTodoData {
  username: string;
  id: string;
}
export interface CompleteTodoData {
  id: string;
  username: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
