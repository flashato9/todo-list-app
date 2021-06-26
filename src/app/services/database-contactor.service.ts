import { Injectable } from '@angular/core';
import { GraphQLResult } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreateTodoInput, DeleteTodoInput, ModelSortDirection, UpdateTodoInput } from 'src/API';
import * as mutations from 'src/graphql/mutations';
import * as query from 'src/graphql/queries';
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
    const input: CreateTodoInput = todoItemDetails;
    try {
      const result = await API.graphql({ query: mutations.createTodo, variables: { input: input } });
      await this.getTodosListFor(todoItemDetails.username);
      const createdTodoItem = <CompleteTodoData>(<GraphQLResult<object>>result).data;
      return createdTodoItem;
    } catch (error) {
      throw error;
    }
  }
  private async getTodosListFor(username: string) {
    try {
      const result = await API.graphql({
        query: query.todosByUsername,
        variables: { username: username, sortDirection: ModelSortDirection.ASC },
      });
      const todoList: CompleteTodoData[] = (<GraphQLResult<any>>result).data.todosByUsername.items;
      this.todoList$s.next(todoList);
    } catch (error) {
      throw error;
    }
  }
  async updateTodo(todoItemDetails: UpdateTodoData) {
    const input: UpdateTodoInput = todoItemDetails;
    try {
      const result = await API.graphql({ query: mutations.updateTodo, variables: { input: input } });
      await this.getTodosListFor(todoItemDetails.username);
      const updatedTodoItem = <CompleteTodoData>(<GraphQLResult<object>>result).data;
      return updatedTodoItem;
    } catch (error) {
      throw error;
    }
  }
  async deleteTodo(todoItemDetails: DeleteTodoData) {
    const input: DeleteTodoInput = { id: todoItemDetails.id };

    try {
      const result = await API.graphql({ query: mutations.deleteTodo, variables: { input: input } });
      await this.getTodosListFor(todoItemDetails.username);
      const deletedTodoItem = <CompleteTodoData>(<GraphQLResult<object>>result).data;
      return deletedTodoItem;
    } catch (error) {
      throw error;
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
