import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Todo {
  readonly id: string;
  readonly username: string;
  readonly title: string;
  readonly description: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  constructor(init: ModelInit<Todo>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}