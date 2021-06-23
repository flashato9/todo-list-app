import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from 'src/graphql/queries';
import { createTodo } from '../../graphql/mutations';

@Injectable({
  providedIn: 'root',
})
export class DatabaseContactorService {
  constructor() {}

  async createNewTodo() {
    const todo = {
      title: 'Use AppSync',
      description: `Realtime and Offline (${new Date().toLocaleString()})`,
    };

    return await API.graphql(graphqlOperation(createTodo, { input: todo }));
  }

  async getData() {
    const result = await API.graphql(graphqlOperation(listTodos));
    console.log(result);
  }
}
