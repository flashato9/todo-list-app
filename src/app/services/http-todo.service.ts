import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpTodoService {
  private _databaseUpdated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public databaseUpdated$ = this._databaseUpdated$.asObservable();
  constructor(private http: HttpClient) {}
  notifyThatDatabaseUpdate() {
    this._databaseUpdated$.next(true);
  }

  createTodoItem(item: TodoListItem) {
    return this.http.post(HTTP_DOMAIN + '/todo-list', item);
  }
  ReadAllTodoItems() {
    return this.http
      .get(HTTP_DOMAIN + '/todo-list')
      .pipe<TodoListItem[]>(map((result: any) => <TodoListItem[]>result.result.rows));
  }
  UpdateTodoItem(item: TodoListItem) {
    return this.http.patch(HTTP_DOMAIN + '/todo-list', item);
  }
  DeleteTodoItem(item: TodoListItem) {
    return this.http.request('DELETE', HTTP_DOMAIN + '/todo-list', { body: item });
  }
}
export interface TodoListItem {
  id: number;
  title: string;
  description: string;
}
export const HTTP_DOMAIN: string = 'http://localhost:5780';
